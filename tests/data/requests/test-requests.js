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

describe('Requests', () => {

    const HOST = 'http://localhost:8080/backend/server.php/';

    beforeEach(() => {

        let fetchStub = sinon.stub(window, 'fetch');

        fetchStub.withArgs(HOST + 'gigs', {method: 'GET'}).returns(jsonOk({

            ticketlink: "http://www.hässleholmsfesten.se",
            datetime: "2017-08-25 16:00:00",
            venue_name: "Hässleholms sommarfest"

        }));

        fetchStub.withArgs((HOST + 'gigs?ticketlink=' + encodeURIComponent('http://www.hässleholmsfesten.se') +
            '&datetime=' + encodeURIComponent('2017-08-25 16:00:00') +
            '&venue_name=' + encodeURIComponent('Hässleholms sommarfest') + '&authToken=mockAuthToken'),
         {method: 'POST'}).returns(Promise.resolve(jsonOk({})));

    });

    afterEach(() => {
        window.fetch.restore();
    });

    describe('/gigs', () => {

        it('should return OK on valid GET to /gigs', () => {

            requests.getRequest(HOST + 'gigs', {}, {}, (fulfilled) => {

                expect(fulfilled.ticketlink).to.equal("http://www.hässleholmsfesten.se");
                expect(fulfilled.datetime).to.equal("2017-08-25 16:00:00");
                expect(fulfilled.venue_name).to.equal("Hässleholms sommarfest");

            }, (error) => {

                console.log(error);

            }, (response) => {

                expect(response.status).to.equal(200);
                return response.json();

            });
        });

        it('should return OK on valid POST to /gigs', () => {

            requests.postRequest(HOST + 'gigs', {

                ticketlink: "http://www.hässleholmsfesten.se",
                datetime: "2017-08-25 16:00:00",
                venue_name: "Hässleholms sommarfest"

            }, {}, null, null, (response) => {

                expect(response.status).to.equal(200);
                return response.json();

            });
        });
    });
});