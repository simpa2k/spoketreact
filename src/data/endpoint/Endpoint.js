import { getRequest, putRequest, postRequest, deleteRequest } from '../requests/requests';

const HOST = 'http://localhost:8080/backend/server.php/';

/*
 * The reason for using a prototype and not an ES6 class is that all
 * endpoints might not support all methods, and creating one subclass
 * for each endpoint that defines all the methods it does support would
 * lead to a lot of code repetition. With a prototype, an endpoint can be
 * instantiated with a set of boolean values indicating which methods
 * are supported.
 */
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
