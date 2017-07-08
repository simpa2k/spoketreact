const expect = require('chai').expect;
const sinon = require('sinon');

// window.fetch polyfill
require('whatwg-fetch');

const requests = require('../../../src/data/requests/requests');

// The following test helper and stubbing of window.fetch was taken from https://rjzaworski.com/2015/06/testing-api-requests-from-window-fetch
const jsonOk = function(body) {

    let mockResponse = new window.Response(JSON.stringify(body), {
        status: 200,
        headers: {'Content-Type': 'application/json'}
    });

    return Promise.resolve(mockResponse);

};

const SAMPLE_TICKETLINK = "http://www.hässleholmsfesten.se";
const SAMPLE_DATETIME = "2017-08-25 16:00:00";
const SAMPLE_VENUE_NAME = "Hässleholms sommarfest";

const sampleGig = (additionalProperties) => {

    let gig = {
        ticketlink: SAMPLE_TICKETLINK,
        datetime: SAMPLE_DATETIME,
        venue_name: SAMPLE_VENUE_NAME
    };

    Object.assign(gig, additionalProperties);

    return gig;

};

const requestOptions = (body, method) => {

    let options = {
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    };

    if (method) {
        options.method = method;
    }

    return options;

};

const sampleRequestOptions = (method) => {
    return requestOptions(sampleGig(), method);
};

describe('Requests', () => {

    const HOST = 'http://localhost:8080/backend/server.php/';

    beforeEach(() => {

        let fetchStub = sinon.stub(window, 'fetch');

        fetchStub.withArgs(HOST + 'gigs', {method: 'GET'}).returns(jsonOk(sampleGig()));
        fetchStub.withArgs(HOST + 'gigs?username=mockUsername&token=mockAuthToken', sampleRequestOptions('POST')).returns(Promise.resolve(jsonOk({})));
        fetchStub.withArgs(HOST + 'gigs?id=1&username=mockUsername&token=mockAuthToken', sampleRequestOptions('PUT')).returns(Promise.resolve(jsonOk({})));

    });

    afterEach(() => {
        window.fetch.restore();
    });

    describe('/gigs', () => {

        it('should return OK on valid GET to /gigs', () => {

            requests.getRequest(HOST + 'gigs', {}, {}, (fulfilled) => {

                expect(fulfilled.ticketlink).to.equal(SAMPLE_TICKETLINK);
                expect(fulfilled.datetime).to.equal(SAMPLE_DATETIME);
                expect(fulfilled.venue_name).to.equal(SAMPLE_VENUE_NAME);

            }, (error) => {

                console.log(error);

            }, (response) => {

                expect(response.status).to.equal(200);
                return response.json();

            });
        });

        it('should return OK on valid POST to /gigs', () => {

            requests.postRequest(HOST + 'gigs', {}, sampleRequestOptions(), null, null, (response) => {

               expect(response.status).to.equal(200);
               return response.json();

            });
        });

        it('should return OK on valid PUT to /gigs', () => {

            requests.putRequest(HOST + 'gigs', {id: 1}, sampleRequestOptions(), null, null, (response) => {

                expect(response.status).to.equal(200);
                return response.json();

            });
        });
    });
});