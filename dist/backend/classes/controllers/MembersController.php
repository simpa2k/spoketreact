<?php

require_once('core/init.php');

/**
 *
 * Class for performing preparations
 * on a RESTful request for data from the
 * member table before it is
 * passed on to a model.
 *
 */

class MembersController extends BaseController {

    public function __construct($model) {
        parent::__construct($model);
    }

    /**
     *
     * Method for handling GET
     * requests.
     *
     * @param Request $request An object representing a request to be handled.
     *
     */

    public function getAction($request) {
        
        if (isset($request->urlElements[2])) {

            $qualifiedAction = "get" . ucfirst($request->urlElements[2]);
            return $this->handleQuery($request, $qualifiedAction);

        } else {
            return $this->handleQuery($request);
        }
        
    }

    /**
     *
     * Method for handling POST requests.
     *
     * @param Request $request An object representing a request to be handled.
     *
     */

    public function post($request) {
        $this->getModel()->insert($request->parameters);
    }

    /**
     *
     * Method for handling PUT requests.
     *
     * @param Request $request An object representing a request to be handled.
     *
     */

    public function put($request) {
        $id = $request->parameters['id'];
        $primaryKey = "id = $id";
        unset($request->parameters['id']);
        $this->getModel()->update($primaryKey, $request->parameters);
    }

    /**
     *
     * Method for handling DELETE requests.
     *
     * @param Request $request An object representing a request to be handled.
     *
     */

    public function delete($request) {
        $primaryKey = $this->filterParameters(array('id'), $request->parameters);
        $this->getModel()->delete($this->formatParameters($primaryKey));
    }

}
