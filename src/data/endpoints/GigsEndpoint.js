const Endpoint = require('./Endpoint');
const requests = require('../requests/requests');

class GigsEndpoint extends Endpoint {

    constructor() {
        super('gigs');
    }

    putRequest(gig, successCallback, errorCallback) {
        this.sendObject(requests.putRequest, gig, {}, {}, successCallback, errorCallback);
    }

    postRequest(gig, successCallback, errorCallback) {
        this.sendObject(requests.postRequest, gig, {}, {}, successCallback, errorCallback);
    }

    deleteRequest(gig, successCallback, errorCallback) {
        this.sendObject(requests.deleteRequest, gig, {}, {}, successCallback, errorCallback);
    }
}

module.exports = GigsEndpoint;