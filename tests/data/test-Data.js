const chai = require('chai');
const expect = require('chai').expect;
const sinon = require('sinon');

const Endpoint = require('../../src/data/endpoint/Endpoint');
import Data from '../../src/data/Data.js';

describe('Data', () => {

    let endpoints = {

        contactPersonsEndpoint: new Endpoint('contactpersons', true, true, true),
        descriptionEndpoint: new Endpoint('description', true, false, false),
        embeddedItemsEndpoint: new Endpoint('embeddeditems', true, true, true),
        gigsEndpoint: new Endpoint('gigs', true, true, true),
        imagesEndpoint: new Endpoint('images', true, true, true),
        membersEndpoint: new Endpoint('members', true, true, true),
        usersEndpoint: new Endpoint('users', false, false, false),
        venuesEndpoint: new Endpoint('venues', true, true, false)

    };

    let data = new Data(endpoints);

    describe('Contact persons', () => {

        const SAMPLE_CONTACT_PERSON =  {
            phonenumber: "+46 (0)73 55 91 230",
            name: "Nisse Blomster",
            id: 1,
            country: "SE"
        };

        describe('getContactInfo', () => {

            it('should call service method with success callback and error callback', () => {

                let success = sinon.spy();
                let error = sinon.spy();

                let getContactInfo = sinon.stub(data.contactPersonsService, 'getRequest');

                data.getContactInfo(success, error);
                sinon.assert.calledWith(getContactInfo, success, error);

            });
        });

        describe('putContactPerson', () => {

            it('should call service method with object, success callback and error callback', () => {

                let success = sinon.spy();
                let error = sinon.spy();

                let putContactPerson = sinon.stub(data.contactPersonsService, 'putRequest');

                data.putContactPerson(SAMPLE_CONTACT_PERSON, success, error);
                sinon.assert.calledWith(putContactPerson, SAMPLE_CONTACT_PERSON, success, error);

            });
        });

        describe('postContactPerson', () => {

            it('should call service method with object, success callback and error callback', () => {

                let success = sinon.spy();
                let error = sinon.spy();

                let postContactPerson = sinon.stub(data.contactPersonsService, 'postRequest');

                data.postContactPerson(SAMPLE_CONTACT_PERSON, success, error);
                sinon.assert.calledWith(postContactPerson, SAMPLE_CONTACT_PERSON, success, error);

            });
        });

        describe('deleteContactPerson', () => {

            it('should call service method with object, success callback and error callback', () => {

                let success = sinon.spy();
                let error = sinon.spy();

                let deleteContactPerson = sinon.stub(data.contactPersonsService, 'deleteRequest');

                data.deleteContactPerson(SAMPLE_CONTACT_PERSON, success, error);
                sinon.assert.calledWith(deleteContactPerson, SAMPLE_CONTACT_PERSON, success, error);

            });
        });
    });
});
