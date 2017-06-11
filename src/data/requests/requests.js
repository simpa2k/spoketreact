require('whatwg-fetch');

const getRequest = function(endpoint, parameters, options, successCallback, errorCallback, format) {

    options.method = 'GET';
    request(endpoint, parameters, options, successCallback, errorCallback, format);

};

const putRequest = function(endpoint, parameters, options, successCallback, errorCallback, format) {

    options.method = 'PUT';
    authenticatedRequest(endpoint, parameters, options, successCallback, errorCallback, format)

};

const postRequest = function(endpoint, parameters, options, successCallback, errorCallback, format) {

    options.method = 'POST';
    authenticatedRequest(endpoint, parameters, options, successCallback, errorCallback, format);

};

const deleteRequest = function(endpoint, parameters, options, successCallback, errorCallback, format) {

    options.method = 'DELETE';
    authenticatedRequest(endpoints, parameters, options, successCallback, errorCallback, format);

};

const authenticatedRequest = function(endpoint, parameters, options, successCallback, errorCallback, format) {

    parameters.authToken = window.localStorage.getItem('authToken');
    request(endpoint, parameters, options, successCallback, errorCallback, format);

};

const request = function(endpoint, parameters, options, successCallback, errorCallback, format)  {

    const URI = buildUri(endpoint, parameters);

    window.fetch(URI, options).then((response) => {

        if ((typeof(format) === 'undefined') || (format === null)) {
            return response.json();
        }
        return format(response);

    }).then((fulfilled) => {

        if ((typeof(successCallback) !== 'undefined') && (successCallback !== null)) {
            successCallback(fulfilled);
        }

    }).catch((error) => {

        if ((typeof(errorCallback) !== 'undefined') && (errorCallback !== null)) {
            errorCallback(error);
        }

    });
};

const buildUri = function(endpoint, parameters) {

    let uri = endpoint;
    let first = true;

    for (const KEY in parameters) {

        if (first) {
            uri += '?';
            first = false;
        } else {
            uri += '&';
        }

        if (parameters.hasOwnProperty(KEY)) {

            let encodedValue = encodeURIComponent(parameters[KEY]);
            uri += (KEY + '=' + encodedValue);

        }
    }

    return uri;

};

module.exports = {

    getRequest: getRequest,
    putRequest: putRequest,
    postRequest: postRequest,
    deleteRequest: deleteRequest

};