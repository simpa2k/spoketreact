import Data from "../../src/data/Data";
import {getRequest, putRequest, postRequest, deleteRequest} from "../../src/data/requests/requests";

const expect = require('chai').expect;
const sinon = require('sinon');

const helpers = require('../helpers/helpers');
const assertProvidesCorrectArgumentsToRequestFunction = helpers.assertProvidesCorrectArgumentsToRequestFunction;

describe('Description Stack', () => {

    const SERVER_ROOT = helpers.serverRoot;
    const endpoint = '/description';

    const absolutePath = SERVER_ROOT + endpoint;

    before((done) => {

        helpers.login(() => {

            done();

        }, (error) => {

            console.error('Could not login. Error: ', error);
            done();

        });
    });

    describe('Get description', () => {

        let parameters = {};
        let options = {};

        it('should get description when provided with correct arguments', () => {

            getRequest(absolutePath, parameters, options, (description) => {

                let actualDescription = description[0]; // Why this is an array is beyond me.

                expect(actualDescription).to.include.own.property('content');
                expect(actualDescription).to.include.own.property('id');

            });
        });

        it('should provide correct arguments', () => {

            let data = new Data();
            let stubbedRequest = sinon.stub(data.descriptionService.endpoint.requests, 'getRequest');

            let successCallback = () => {};
            let errorCallback = () => {};

            data.getDescription(successCallback, errorCallback);
            sinon.assert.calledWith(stubbedRequest, absolutePath, {}, {}, sinon.match.any, errorCallback, undefined);

        });
    });

    describe('Modify description', () => {

        let description = {};
        let updatedDescription;

        before((done) => {

            getRequest(absolutePath, {}, {}, (response) => {

                description = response[0];
                done();

            }, (error) => {

                console.error('Error when getting description in preparation for updating', error);
                done();

            });
        });

        it('should put description when provided with correct arguments', (done) => {

            updatedDescription = Object.assign({}, description);
            updatedDescription.content = 'This is just a fake description!';

            putRequest(absolutePath, updatedDescription, {}, () => {

                getRequest(absolutePath, {id: updatedDescription.id}, {}, (descriptionResponse) => {

                    let actualDescription = descriptionResponse[0];

                    expect(actualDescription.content).to.equal(updatedDescription.content);
                    expect(actualDescription.content).to.not.equal(description.content);

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

        it('should restore updated description', (done) => {

            putRequest(absolutePath, description, {}, () => {

                getRequest(absolutePath, {id: description.id}, {}, (descriptionResponse) => {

                    let actualDescription = descriptionResponse[0];

                    expect(actualDescription.content).to.equal(description.content);
                    expect(actualDescription.content).to.not.equal(updatedDescription.content);

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

        describe('Provide correct arguments for modification requests', () => {

            let data = new Data();

            let description = {};
            assertProvidesCorrectArgumentsToRequestFunction.objectAsOptions(data.descriptionService, 'put', data.putDescription, description);

        });
    });
});