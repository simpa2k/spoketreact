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

    parameters.authToken = localStorage.getItem('authToken');
    request(endpoint, parameters, options, successCallback, errorCallback, format);

};

const request = function(endpoint, parameters, options, successCallback, errorCallback, format)  {

    const URI = buildUri(endpoint, parameters);

    fetch(URI, options).then((response) => {

        if (typeof((format) === 'undefined') || (format === null)) {
            console.log('Returning json');
            return response.json();
        }
        return format(response);

    }).then((fulfilled) => {

        successCallback(fulfilled);

    }).catch((error) => {

        errorCallback(error);

    });
};

const buildUri = function(endpoint, parameters) {

    let uri = endpoint + '?';
    let first = true;

    for (const KEY in parameters) {

        if (first) {
            first = false;
        } else {
            uri += '&';
        }

        if (parameters.hasOwnProperty(KEY)) {
            uri += (KEY + '=' + parameters[KEY]);
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
