<?php

require_once 'core/init.php';

/**
 *
 * Base class for controller classes
 *
 */

abstract class BaseController {

    private $model;
    private $operators = array('gt' => '>',
                               'gte' => '>=',
                               'lt' => '<',
                               'lte' => '<=');

    public function __construct($model) {

        $this->model = $model;

    }

    protected function getModel() {

        return $this->model;

    }

    /**
     *
     * Method for translating operators
     * from the format used in RESTful
     * requests to those used in the database.
     *
     * @param string $operator An operator in RESTful format
     * to be translated to a traditional arithmetic operator.
     *
     */

    protected function translateOperator($operator) {

        if(array_key_exists($operator, $this->operators)) {

            return $this->operators[$operator];

        } else {

            return $operator;

        }

    }

    /**
     * Method for routing a request
     * to the correct method in the model.
     * 
     * @param Request $request A request object
     * @param string $qualifiedAction An optional parameter
     * which can be useful for handling extra url elements.
     * For example, if a request was made to /images/galleries and
     * the second url element, galleries, was specified as a 
     * qualified action the model method called would be
     * getGalleries() or getAllGalleries() instead of just get()
     * or getAll()
     */

    public function handleQuery($request, $qualifiedAction = "") {

        if(!empty($qualifiedAction)) {

            $qualifiedAction = ucfirst($qualifiedAction);

        }

        $lowerCaseVerb = strtolower($request->verb);
        if($request->parameters) {

            //$method = "get" . $qualifiedAction;
            $method = $lowerCaseVerb . $qualifiedAction;

            $results = $this->model->$method($this->formatParameters($request->parameters));
            return $results;

        } else {

            //$method = "getAll" . $qualifiedAction;
            $method = $lowerCaseVerb . "All" . $qualifiedAction;

            return $this->model->$method();

        }

    }
    
    /**
     *
     * Method used to parse the request
     * parameters of a request object and present them in a format that
     * the database wrapper in turn can translate to sql.
     * However, due to lack of time there are some inconsistencies
     * in what format the database wrapper expects where conditions to be in
     * for different types of operations.
     * Currently the request parameters must be formatted when inserting
     * and when deleting but not when updating.
     *
     * @param mixed[] $parameters Request parameters to be formatted.
     *
     */

    protected function formatParameters($parameters) {

        $where = array();

        foreach($parameters as $parameterName => $parameter) {

            $parameterParts = explode('=', $parameter);

            if(sizeof($parameterParts) == 1) {
                $where[] = array($parameterName, '=', $parameterParts[0]);
            } else {
                $where[] = array($parameterName, $this->translateOperator($parameterParts[0]), $parameterParts[1]);
            }

        }

        return $where;

    }

    /**
     *
     * Method to pick out certain parameters of interest
     * from an array.
     *
     * @param string[] $whiteListedParameters An array containing the parameters to be picked out.
     * @param mixed[] $parameters An array of parameters to be filtered.
     *
     */

    protected function filterParameters($whiteListedParameters, $parameters) {
       $filteredParameters = array(); 
        
       foreach($whiteListedParameters as $whiteListedKey) {
           foreach($parameters as $key => $value) {
               if($whiteListedKey == $key) {
                 $filteredParameters[$key] = $value;
               }
           }
       } 
       return $filteredParameters; 
    }

    /**
     *
     * Method to remove authentication parameters
     * from a request. This method is necessary due to the fact that
     * this api expects authentication information to be passed as part
     * of the json representing the database object. Usually this information
     * is provided in the HTTP header, and if that had been the case this
     * wouldn't be necessary.
     *
     * @param Request &$request The addres of a request object to be modified.
     *
     */

    private function unsetAuthenticationParameters(&$request) {
        if(isset($request->parameters['username'])) {
            unset($request->parameters['username']);
        }
        
        if(isset($request->parameters['token'])) {
            unset($request->parameters['token']);
        }
    }

    /**
     *
     * Method to check an authentication token.
     *
     * @param mixed[] $requestParameters An array of parameters containing
     * a username and a token to be checked.
     *
     */

    public function checkToken($requestParameters) {

        if(isset($requestParameters['username'])) {

            $db = $this->model->getDB();

            $action = 'SELECT *';
            $table = 'user, token';
            $where = array(0 => array('username', '=', $requestParameters['username']));
            $joinCondition = array(0 => array('user.id', 'userId'));

            $results = $db->action($action, $table, $where, $joinCondition)->first();

            if($results != null) {

                $storedToken = $results->token;
                $sentToken = $requestParameters['token'];

                $storedTokenCreationDate = new DateTime($results->created);
                $storedTokenExpirationDate = $storedTokenCreationDate->add(new DateInterval('PT' . 30 . 'M'));
                $currentDate = new DateTime("now");

                $tokenMatches = $storedToken == $sentToken;
                $tokenValid = $currentDate < $storedTokenExpirationDate;

                if($tokenMatches && $tokenValid) {
                    return true;
                }
            }

        } 
        http_response_code(401);
    }

    public abstract function post($request);
    public abstract function put($request);
    public abstract function delete($request);

    /**
     *
     * Method to handle a post request. Requires authentication.
     *
     * @param Request $request A post request to be handled.
     *
     */

    public function postAction($request) {
       if($this->checkToken($request->parameters)) {
           $this->unsetAuthenticationParameters($request);
           $this->post($request);
       } 
    }

    /**
     *
     * Method to handle a put request. Requires authentication.
     *
     * @param Request $request A put request to be handled.
     *
     */

    public function putAction($request) {
        if($this->checkToken($request->parameters)) {
            $this->unsetAuthenticationParameters($request);
            $this->put($request);
        } 
        
    }

    /**
     *
     * Method to handle a delete request. Requires authentication.
     *
     * @param Request $request A delete request to be handled.
     *
     */

    public function deleteAction($request) {
        if($this->checkToken($request->parameters)) {
            $this->unsetAuthenticationParameters($request);
            $this->delete($request);
        } 
        
    }

}
