import Data from "../../src/data/Data";
import {getRequest, putRequest, postRequest, deleteRequest} from "../../src/data/requests/requests";

const expect = require('chai').expect;
const sinon = require('sinon');

const helpers = require('../helpers/helpers');
const assertProvidesCorrectArgumentsToRequestFunction = helpers.assertProvidesCorrectArgumentsToRequestFunction;

/*
 * The reason for splitting tests up, having separate
 * test cases for performing the request and for making
 * sure correct arguments are provided to the request
 * functions, is that mocha requires returning the result
 * of functions relying on promises. Since it's impractical
 * to have the whole stack return the result of the calls
 * further down when the mechanism actually used
 * higher up is callbacks rather than promises
 * the part that actually uses promises (that is, the
 * requets module) will return them, whereas the
 * modules higher up (Data, services and endpoints)
 * will not.
 */
describe('Contact Persons Stack', () => {

    const SERVER_ROOT = helpers.serverRoot;
    const endpoint = '/contactpersons';

    const absolutePath = SERVER_ROOT + endpoint;

    const createOptions = (contactPerson) => {

        return {
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(contactPerson)
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

    describe('Get Contact Persons', () => {

        /*
         * Using fetch through node requires absolute paths.
         * Relative paths seem to work when using the browser
         * even though the same polyfill is being used.
         * However, I've only tested this in Firefox which supports
         * fetch natively. Might be an idea to check that it
         * works in browsers that do not support fetch as well.
         */
        const parameters = {};
        const options = {};

        it('should get contact info when provided with correct arguments', () => {

            /*
             * Promises have to be returned for mocha to be able to handle them.
             */
            return getRequest(absolutePath, parameters, options, (contactInfo) => {

                expect(contactInfo).to.be.an('array');

                for (let contactPerson of contactInfo) {

                    /*
                     * The reason for using several lines of property checking
                     * is that the use of keys throws a reference error
                     * complaining that HTMLElement is not defined.
                     * It doesn't seem possible to list several properties
                     * on the same line, since chai interprets that as
                     * being supposed to make a check that the first property
                     * has the same value as the following items in the list.
                     */
                    expect(contactPerson).to.include.own.property('phonenumber');
                    expect(contactPerson).to.include.own.property('name');
                    expect(contactPerson).to.include.own.property('id');
                    expect(contactPerson).to.include.own.property('country');

                }

            }, (error) => {
                console.error('Error: ', error);
            });
        });

        it('should provide correct arguments', () => {

            let data = new Data();
            let stubbedRequest = sinon.stub(data.contactPersonsService.endpoint.requests, 'getRequest');

            let successCallback = () => {};
            let errorCallback = () => {};

            data.getContactInfo(successCallback, errorCallback);
            sinon.assert.calledWith(stubbedRequest, absolutePath, {}, {}, sinon.match.any, errorCallback, undefined);

        });
    });

    /*
     * ToDo: Fix assertions in error callbacks.
     */
    describe('Modify Contact Person', () => {

        let contactPerson = {
            "phonenumber": "123 456 789",
            "name": "Test Testsson",
            "country": "SE"
        };

        it('should post contact person when provided with correct arguments', (done) => {

            postRequest(absolutePath, {}, createOptions(contactPerson), () => {

                getRequest(absolutePath, {}, {}, (contactInfo) => {

                    /*
                     * Wouldn't it be nice if the backend just returned the id of the newly created item?
                     * Yes, it would.
                     */
                    contactPerson = contactInfo.find((person) => {
                        return person.phonenumber === contactPerson.phonenumber && person.name === contactPerson.name && person.country === contactPerson.country;
                    });

                    expect(contactPerson.id).to.not.equal(undefined);

                    done();

                }, (error) => {

                    console.error(error);
                    done();

                });

            }, (error) => {

                console.error('Error: ', error);
                done();

            }, (response) => {

                expect(response.status).to.equal(200);
                return response.json();

            });
        });

        it('should put contact person when provided with correct arguments', (done) => {

            let updatedContactPerson = Object.assign({}, contactPerson);
            updatedContactPerson.name = "Testaren Testarensson";

            putRequest(absolutePath, updatedContactPerson, {}, () => {

                getRequest(absolutePath, {id: contactPerson.id}, {}, (contactInfo) => {

                    let result = contactInfo[0];
                    expect(result.name).to.equal(updatedContactPerson.name);

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

        it('should delete contact person when provided with correct arguments', () => {

            return deleteRequest(absolutePath, contactPerson, {}, () => {

            }, (error) => {

            }, (response) => {
                expect(response.status).to.equal(200);
            });
        });

        describe('Provide correct arguments for modification requests', () => {

            let data = new Data();

            let contactPerson = {
                "phonenumber": "123 456 789",
                "name": "Test Testsson",
                "country": "SE"
            };

            let contactPersonWithId = Object.assign({id: 1}, contactPerson);

            assertProvidesCorrectArgumentsToRequestFunction.objectAsOptions(data.contactPersonsService, 'post', data.postContactPerson, contactPerson);
            assertProvidesCorrectArgumentsToRequestFunction.objectAsOptions(data.contactPersonsService, 'put', data.putContactPerson, contactPersonWithId);
            assertProvidesCorrectArgumentsToRequestFunction.objectAsParameters(data.contactPersonsService, 'delete', data.deleteContactPerson, contactPersonWithId);

        });
    });
});