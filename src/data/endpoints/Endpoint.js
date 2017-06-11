import { getRequest, putRequest, postRequest, deleteRequest } from '../requests/requests';
//const requests = require('../requests/requests');

/*class Endpoint {

    constructor(endpointName) {

        this.host = 'http://localhost:9876/';
        this.endpoint = this.host + endpointName;

    }*/

    /*
     * This is the function that actually makes the call to the server.
     * Making all functions that send object to the server go through this
     * function is motivated by the fact that the server as of now is not
     * implementing the HTTP protocol properly, instead requiring put and
     * posts to send all information in the parameters and not the body.
     * When this is corrected, changes only have to be made here.
     */
    /*sendObject(sendFunction, object, parameters, options, successCallback, errorCallback, format) {

        Object.assign(parameters, object);
        sendFunction(this.endpoint, parameters, options, successCallback, errorCallback, format);

    }

    getRequest(successCallback, errorCallback) {
        requests.getRequest(this.endpoint, {}, {}, successCallback, errorCallback);
    }
}*/

const HOST = 'http://localhost:8080/backend/server.php/';

const Endpoint = function(endpointName, puttable, postable, deleteable) {

    this.endpointName = HOST + endpointName;

    this.sendObject = (sendFunction, object, parameters, options, successCallback, errorCallback, format) => {

        Object.assign(parameters, object);
        sendFunction(this.endpointName, parameters, options, successCallback, errorCallback, format);

    };

    this.getRequest = (successCallback, errorCallback, responseFormat) => {
        getRequest(this.endpointName, {}, {}, successCallback, errorCallback, responseFormat);
    };

    this.putRequest = puttable ? (object, successCallback, errorCallback, responseFormat) => {
        this.sendObject(putRequest, object, {}, {}, successCallback, errorCallback, responseFormat);
    } : undefined;

    this.postRequest = postable ? (object, successCallback, errorCallback, responseFormat) => {
        this.sendObject(postRequest, object, {}, {}, successCallback, errorCallback, responseFormat);
    } : undefined;

    this.deleteRequest = deleteable ? (object, successCallback, errorCallback, responseFormat) => {
        this.sendObject(deleteRequest, object, {}, {}, successCallback, errorCallback, responseFormat);
    } : undefined;
};

module.exports = Endpoint;
