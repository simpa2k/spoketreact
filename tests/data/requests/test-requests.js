const expect = require('chai').expect;
const sinon = require('sinon');

// window.fetch polyfill
require('whatwg-fetch');

const requests = require('../../../src/data/requests/requests');

describe('Requests', () => {

    // The stubbing of window.fetch was taken from https://rjzaworski.com/2015/06/testing-api-requests-from-window-fetch

    beforeEach(() => {

        let fetchStub = sinon.stub(window, 'fetch');

        let nonBodyOkItems = {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        };

        let getBody = '{"ticketlink": "http://www.hässleholmsfesten.se", "datetime": "2017-08-25 16:00:00", "venue_name": "Hässleholms sommarfest"}';

        let getRes = new window.Response(getBody, nonBodyOkItems);
        let postRes = new window.Response('{}', nonBodyOkItems);

        fetchStub.withArgs('http://localhost:8080/backend/server.php/gigs', {method: 'GET'}).returns(Promise.resolve(getRes));
        fetchStub.withArgs(('http://localhost:8080/backend/server.php/gigs?ticketlink=http%3A%2F%2Fwww.h%C3%A4ssleholmsfesten.se&datetime=2017-08-25%2016%3A00%3A00&venue_name=H%C3%A4ssleholms%20sommarfest&authToken=mockAuthToken'),
            {method: 'POST'}).returns(Promise.resolve(postRes));

    });

    afterEach(() => {
        window.fetch.restore();
    });

    describe('/gigs', () => {

        it('should return OK on valid GET to /gigs', () => {

            requests.getRequest('http://localhost:8080/backend/server.php/gigs', {}, {}, (fulfilled) => {

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

            requests.postRequest('http://localhost:8080/backend/server.php/gigs', {

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