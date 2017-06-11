const Endpoint = require('./Endpoint');
const requests = require('../requests/requests');

class ContactPersonsEndpoint extends Endpoint {

    constructor() {
        super('contactpersons');
    }

    putRequest(contactPerson, successCallback, errorCallback) {
        this.sendObject(requests.putRequest, contactPerson, {}, {}, successCallback, errorCallback);
    }

    postRequest(contactPerson, successCallback, errorCallback) {
        this.sendObject(requests.postRequest, contactPerson, {}, {}, successCallback, errorCallback);
    }

    deleteRequest(contactPerson, successCallback, errorCallback) {
        this.sendObject(requests.deleteRequest, contactPerson, {}, {}, successCallback, errorCallback);
    }
}

module.exports = ContactPersonsEndpoint;
