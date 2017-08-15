import Data from "../../src/data/Data";
import {getRequest, postRequest, deleteRequest} from "../../src/data/requests/requests";

const expect = require('chai').expect;
const sinon = require('sinon');

describe('Contact Persons Stack', () => {

    const SERVER_ROOT = 'http://localhost:8080/backend/server.php/';
    const endpoint = 'contactpersons';

    describe('Get Contact Persons', () => {

        /*
         * Using fetch through node requires absolute paths.
         * Relative paths seem to work when using the browser
         * even though the same polyfill is being used.
         * However, I've only tested this in firefox which supports
         * fetch natively. Might be an idea to check that it
         * works in browsers that do not support fetch as well.
         */
        const parameters = {};
        const options = {};

        it('should get contact info when provided with correct arguments', () => {

            /*
             * Promises have to be returned for mocha to be able to handle them.
             */
            return getRequest(SERVER_ROOT + endpoint, parameters, options, (contactInfo) => {

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
                console.log('Error: ', error);
            });
        });

        it('should provide correct arguments', () => {

            let data = new Data();
            let stubbedRequest = sinon.stub(data.contactPersonsService.endpoint.requests, 'getRequest');

            let successCallback = () => {};
            let errorCallback = () => {};

            data.getContactInfo(successCallback, errorCallback);
            sinon.assert.calledWith(stubbedRequest, SERVER_ROOT + endpoint, {}, {}, sinon.match.any, errorCallback, undefined);

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

            let options = {

                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "phonenumber": "123 456 789",
                    "name": "Test Testsson",
                    "country": "SE"
                })
            };

            postRequest(SERVER_ROOT + endpoint, {}, options, () => {

                getRequest(SERVER_ROOT + endpoint, {}, {}, (contactInfo) => {

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

                    console.log(error);
                    done();

                });

            }, (error) => {

                console.log('Error: ', error);
                done();

            }, (response) => {

                expect(response.status).to.equal(200);
                return response.json();

            });
        });

        it('should delete contact person when provided with correct arguments', () => {

            console.log('Deleting', contactPerson);

            return deleteRequest(SERVER_ROOT + endpoint, contactPerson, {}, () => {

            }, (error) => {

            });
        });
    });

});