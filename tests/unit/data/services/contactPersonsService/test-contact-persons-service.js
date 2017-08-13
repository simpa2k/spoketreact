const expect = require('chai').expect;
const sinon = require('sinon');

import {EMAIL, ContactPersonsService} from '../../../../../src/data/services/ContactPersonsService';

describe('ContactPersonsService', () => {

    const SAMPLE_EMAIL = EMAIL;
    const SAMPLE_CONTACT_PERSONS = require('./sampleContactPersons.json');

    let contactPersonsService;

    beforeEach(() => {

        contactPersonsService = new ContactPersonsService();

    });

    describe('getRequest', () => {

        let callbackArguments = {
            email: SAMPLE_EMAIL,
            contactPersons: SAMPLE_CONTACT_PERSONS
        };

        let getRequest;

        beforeEach(() => {

            getRequest = sinon.stub(contactPersonsService.endpoint, 'getRequest');

            /*
             * Note that the whole point of the following tests are to check that
             * the email gets added without it being supplied from the server,
             * which is why the endpoint only yields a list of contact persons.
             */
            getRequest.yields(SAMPLE_CONTACT_PERSONS);

        });

        it('should return email on getting contact info', () => {

            let successCallbackSpy = sinon.spy((contactInfoResponse) => {
                expect(contactInfoResponse.email).to.equal(SAMPLE_EMAIL);
            });

            contactPersonsService.getRequest(successCallbackSpy);

            sinon.assert.calledWith(successCallbackSpy, callbackArguments);

        });

        it('should return contact persons on getting contact info', () => {

            let successCallbackSpy = sinon.spy((contactInfoResponse) => {
                expect(contactInfoResponse.contactPersons).to.equal(SAMPLE_CONTACT_PERSONS);
            });

            contactPersonsService.getRequest(successCallbackSpy);

            sinon.assert.calledWith(successCallbackSpy, callbackArguments);

        });
    });

    describe('putRequest', () => {

        it('should call endpoint put function with object, success callback and error callback', () => {

            let putRequest = sinon.stub(contactPersonsService.endpoint, 'putRequest');

            let successCallbackSpy = sinon.spy();
            let errorCallbackSpy = sinon.spy();

            contactPersonsService.putRequest(SAMPLE_CONTACT_PERSONS[0], successCallbackSpy, errorCallbackSpy);

            sinon.assert.calledWith(contactPersonsService.endpoint.putRequest,
                SAMPLE_CONTACT_PERSONS[0], successCallbackSpy, errorCallbackSpy);

        });
    });

    describe('postRequest', () => {

        it('should call endpoint post function with object, success callback and error callback', () => {

            let postRequest = sinon.stub(contactPersonsService.endpoint, 'postRequest');

            let successCallbackSpy = sinon.spy();
            let errorCallbackSpy = sinon.spy();

            contactPersonsService.postRequest(SAMPLE_CONTACT_PERSONS[0], successCallbackSpy, errorCallbackSpy);

            sinon.assert.calledWith(contactPersonsService.endpoint.postRequest,
                SAMPLE_CONTACT_PERSONS[0], successCallbackSpy, errorCallbackSpy);

        });
    });

    describe('deleteRequest', () => {

        it('should call endpoint delete function with object, success callback and error callback', () => {

            let deleteRequest = sinon.stub(contactPersonsService.endpoint, 'deleteRequest');

            let successCallbackSpy = sinon.spy();
            let errorCallbackSpy = sinon.spy();

            contactPersonsService.deleteRequest(SAMPLE_CONTACT_PERSONS[0], successCallbackSpy, errorCallbackSpy);

            sinon.assert.calledWith(contactPersonsService.endpoint.deleteRequest,
                SAMPLE_CONTACT_PERSONS[0], successCallbackSpy, errorCallbackSpy);

        });
    });
});
