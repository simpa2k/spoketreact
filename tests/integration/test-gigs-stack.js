import Data from "../../src/data/Data";
import {getRequest, putRequest, postRequest, deleteRequest} from "../../src/data/requests/requests";

const expect = require('chai').expect;
const sinon = require('sinon');

const helpers = require('../helpers/helpers');
const assertProvidesCorrectArgumentsToRequestFunction = helpers.assertProvidesCorrectArgumentsToRequestFunction;

describe('Gig Stack', () => {

    const SERVER_ROOT = helpers.serverRoot;
    const endpoint = '/gigs';

    const absolutePath = SERVER_ROOT + endpoint;

    const createOptions = (gig) => {

        return {
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(gig)
        }
    };

    before((done) => {

        helpers.login(() => {

            done();

        }, (error) => {

            console.error('Could not login. Error: ', error);
            done();

        });
    });

    describe('Get gig', () => {

        let parameters = {};
        let options = {};

        it('should get gigs when provided with correct arguments', () => {

            getRequest(absolutePath, parameters, options, (gigs) => {

                expect(gigs).to.be.an('array');

                for (let gig of gigs) {

                    /*
                     * The reason for using several lines of property checking
                     * is that the use of keys throws a reference error
                     * complaining that HTMLElement is not defined.
                     * It doesn't seem possible to list several properties
                     * on the same line, since chai interprets that as
                     * being supposed to make a check that the first property
                     * has the same value as the following items in the list.
                     */
                    expect(gig).to.include.own.property('ticketlink');
                    expect(gig).to.include.own.property('info');
                    expect(gig).to.include.own.property('datetime');
                    expect(gig).to.include.own.property('id');
                    expect(gig).to.include.own.property('venue_name');
                    expect(gig).to.include.own.property('address');
                    expect(gig).to.include.own.property('name');
                    expect(gig).to.include.own.property('city');
                    expect(gig).to.include.own.property('webpage');

                }

            });
        });

        it('should provide correct arguments', () => {

            let data = new Data();
            let stubbedRequest = sinon.stub(data.gigsService.endpoint.requests, 'getRequest');

            let successCallback = () => {};
            let errorCallback = () => {};

            data.getGigs(successCallback, errorCallback);
            sinon.assert.calledWith(stubbedRequest, absolutePath, {}, {}, sinon.match.any, errorCallback, undefined);

        });
    });

    describe('Modify gig', () => {

        let gig = {

            ticketlink: "",
            info: "Testgig",
            price: null,
            datetime: "2017-01-09 01:01:01",
            venue_name: "Folk at Heart",

        };

        it('should post gig when provided with correct arguments', (done) => {

            postRequest(absolutePath, {}, createOptions(gig), () => {

                getRequest(absolutePath, {}, {}, (gigs) => {

                    gig = gigs.find((retrievedGig) => {
                        return gig.info === retrievedGig.info; // ToDo: Not the most robust solution.
                    });

                    expect(gig.id).to.not.equal(undefined);

                    done();

                }, (error) => {

                    console.error(error);
                    done();

                });

            }, (error) => {

                console.error(error);
                done();

            }, (response) => {

                expect(response.status).to.equal(200);
                return response.json();

            });
        });

        it('should put gig when provided with correct arguments', (done) => {

            let updatedGig = Object.assign({}, gig);
            updatedGig.info = "This gig's info has now changed.";

            delete updatedGig.address;
            delete updatedGig.name;
            delete updatedGig.city;
            delete updatedGig.webpage;

            putRequest(absolutePath, updatedGig, {}, () => {

                getRequest(absolutePath, {id: updatedGig.id}, {}, (gigs) => {

                    let result = gigs[0];
                    expect(result.info).to.equal(updatedGig.info);

                    done();

                }, (error) => {

                    console.error(error);
                    done();

                });

            }, (error) => {

                console.error(error);
                done();

            }, (response) => {

                expect(response.status).to.equal(200);
                return response.json();

            });
        });

        it('should delete gig when provided with correct arguments', () => {

            return deleteRequest(absolutePath, gig, {}, () => {

            }, (error) => {

            }, (response) => {
                expect(response.status).to.equal(200);
            });
        });

        describe('Provide correct arguments for modification requests', () => {

            let data = new Data();

            let gig = {};

            let gigWithId = Object.assign({id: 1}, gig);

            assertProvidesCorrectArgumentsToRequestFunction.objectAsOptions(data.gigsService, 'post', data.postGig, gigWithId);
            assertProvidesCorrectArgumentsToRequestFunction.objectAsOptions(data.gigsService, 'put', data.putGig, gigWithId);
            assertProvidesCorrectArgumentsToRequestFunction.objectAsParameters(data.gigsService, 'delete', data.deleteGig, gigWithId);

        });
    });
});