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

    const assertServiceMethodCalled = (service, methodToStub, methodUnderTest, sampleObject) => {

        let should = 'should call service method with ';

        if (sampleObject) {
            should += 'object, ';
        }

        should += 'success callback and error callback';

        it(should, () => {

            let functionStub = sinon.stub(service, methodToStub);

            let successCallback = sinon.spy();
            let errorCallback = sinon.spy();

            if (sampleObject) {

                methodUnderTest(sampleObject, successCallback, errorCallback);
                sinon.assert.calledWith(functionStub, sampleObject, successCallback, errorCallback);

            } else {

                methodUnderTest(successCallback, errorCallback);
                sinon.assert.calledWith(functionStub, successCallback, errorCallback);

            }
        });
    };

    describe('Contact persons', () => {

        const SAMPLE_CONTACT_PERSON =  {
            phonenumber: "+46 (0)73 55 91 230",
            name: "Nisse Blomster",
            id: 1,
            country: "SE"
        };

        const assertContactPersonsServiceMethodCalled = (methodToStub, methodUnderTest, sampleContactPerson) => {
            assertServiceMethodCalled(data.contactPersonsService, methodToStub, methodUnderTest, sampleContactPerson);
        };

        describe('getContactInfo', () => {
            assertContactPersonsServiceMethodCalled('getRequest', data.getContactInfo);
        });

        describe('putContactPerson', () => {
            assertContactPersonsServiceMethodCalled('putRequest', data.putContactPerson);
        });

        describe('postContactPerson', () => {
            assertContactPersonsServiceMethodCalled('postRequest', data.postContactPerson);
        });

        describe('deleteContactPerson', () => {
            assertContactPersonsServiceMethodCalled('deleteRequest', data.deleteContactPerson);
        });
    });

    describe('Description', () => {

        const SAMPLE_DESCRIPTION = {};

        const assertDescriptionServiceMethodCalled = (methodToStub, methodUnderTest, sampleDescription) => {
            assertServiceMethodCalled(data.descriptionService, methodToStub, methodUnderTest, sampleDescription);
        };

        describe('getDescription', () => {
            assertDescriptionServiceMethodCalled('getDescription', data.getDescription);
        });

        describe('putDescription', () => {
            assertDescriptionServiceMethodCalled('putDescription', data.putDescription, SAMPLE_DESCRIPTION);
        });

        describe('getDescriptionStructure', () => {

            it('should call service method with callback', () => {

                let getDescriptionStructure = sinon.stub(data.descriptionService, 'getDescriptionStructure');
                let callback = sinon.spy();

                data.getDescriptionStructure(callback);
                sinon.assert.calledWith(getDescriptionStructure, callback);

            });
        });
    });

    describe('Embedded items', () => {

        const SAMPLE_EMBEDDED_ITEM = {};

        const assertEmbeddedItemsServiceMethodCalled = (methodToStub, methodUnderTest, sampleEmbeddedItem) => {
            assertServiceMethodCalled(data.embeddedItemsService, methodToStub, methodUnderTest, sampleEmbeddedItem);
        };

        describe('getEmbeddedItems', () => {
            assertEmbeddedItemsServiceMethodCalled('getEmbeddedItems', data.getEmbeddedItems);
        });

        describe('getVideos', () => {
            assertEmbeddedItemsServiceMethodCalled('getVideos', data.getVideos);
        });

        describe('getSounds', () => {
            assertEmbeddedItemsServiceMethodCalled('getSounds', data.getSounds);
        });

        describe('putEmbeddedItem', () => {
            assertEmbeddedItemsServiceMethodCalled('putEmbeddedItem', data.putEmbeddedItem, SAMPLE_EMBEDDED_ITEM);
        });

        describe('postEmbeddedItem', () => {
            assertEmbeddedItemsServiceMethodCalled('postEmbeddedItem', data.postEmbeddedItem, SAMPLE_EMBEDDED_ITEM);
        });

        describe('deleteEmbeddedItem', () => {
            assertEmbeddedItemsServiceMethodCalled('deleteEmbeddedItem', data.deleteEmbeddedItem, SAMPLE_EMBEDDED_ITEM);
        });

        describe('putVideo', () => {
            assertEmbeddedItemsServiceMethodCalled('putVideo', data.putVideo, SAMPLE_EMBEDDED_ITEM);
        });

        describe('postVideo', () => {
            assertEmbeddedItemsServiceMethodCalled('postVideo', data.postVideo, SAMPLE_EMBEDDED_ITEM);
        });
    });
});
