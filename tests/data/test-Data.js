const chai = require('chai');
const expect = require('chai').expect;
const sinon = require('sinon');

const helperFunctions = require('../helpers/helper-functions');

const assertFunctionCalledWithSingleCallback = helperFunctions.assertFunctionCalledWithSingleCallback;
const assertServiceMethodCalled = helperFunctions.assertCallDelegatedProperly;

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

        const assertContactPersonsServiceMethodCalled = (methodToStub, methodUnderTest, sampleContactPerson) => {
            assertServiceMethodCalled(data.contactPersonsService, 'service', methodToStub, methodUnderTest, sampleContactPerson);
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
            assertServiceMethodCalled(data.descriptionService, 'service', methodToStub, methodUnderTest, sampleDescription);
        };

        describe('getDescription', () => {
            assertDescriptionServiceMethodCalled('getDescription', data.getDescription);
        });

        describe('putDescription', () => {
            assertDescriptionServiceMethodCalled('putDescription', data.putDescription, SAMPLE_DESCRIPTION);
        });

        describe('getDescriptionStructure', () => {
            assertFunctionCalledWithSingleCallback(data.descriptionService, 'getDescriptionStructure', data.getDescriptionStructure);
        });
    });

    describe('Embedded items', () => {

        const SAMPLE_EMBEDDED_ITEM = {};

        const assertEmbeddedItemsServiceMethodCalled = (methodToStub, methodUnderTest, sampleEmbeddedItem) => {
            assertServiceMethodCalled(data.embeddedItemsService, 'service', methodToStub, methodUnderTest, sampleEmbeddedItem);
        };

        describe('getEmbeddedItems', () => {
            assertEmbeddedItemsServiceMethodCalled('getEmbeddedItems', data.getEmbeddedItems);
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

        describe('getVideos', () => {
            assertEmbeddedItemsServiceMethodCalled('getVideos', data.getVideos);
        });

        describe('putVideo', () => {
            assertEmbeddedItemsServiceMethodCalled('putVideo', data.putVideo, SAMPLE_EMBEDDED_ITEM);
        });

        describe('postVideo', () => {
            assertEmbeddedItemsServiceMethodCalled('postVideo', data.postVideo, SAMPLE_EMBEDDED_ITEM);
        });

        describe('getEmbeddedItemStructure', () => {
            assertFunctionCalledWithSingleCallback(data.embeddedItemsService, 'getVideoStructure', data.getEmbeddedItemStructure);
        });

        describe('getSounds', () => {
            assertEmbeddedItemsServiceMethodCalled('getSounds', data.getSounds);
        });

        describe('getSoundStructure', () => {
            assertFunctionCalledWithSingleCallback(data.embeddedItemsService, 'getSoundStructure', data.getSoundStructure);
        });
    });

    describe('Gigs', () => {

        const SAMPLE_GIG = {};

        const assertGigsServiceMethodCalled = (methodToStub, methodUnderTest, sampleGig) => {
            assertServiceMethodCalled(data.gigsService, 'service', methodToStub, methodUnderTest, sampleGig);
        };

        describe('getGigs', () => {
            assertGigsServiceMethodCalled('getGigs', data.getGigs);
        });

        describe('putGig', () => {
            assertGigsServiceMethodCalled('putGig', data.putGig, SAMPLE_GIG);
        });

        describe('postGig', () => {
            assertGigsServiceMethodCalled('postGig', data.postGig, SAMPLE_GIG);
        });

        describe('deleteGig', () => {
            assertGigsServiceMethodCalled('deleteGig', data.deleteGig, SAMPLE_GIG);
        });
    });

    describe('Galleries', () => {

        const SAMPLE_GALLERY = {};
        const SAMPLE_IMAGE = {};

        const assertGalleriesServiceMethodCalled = (methodToStub, methodUnderTest, sampleGallery) => {
            assertServiceMethodCalled(data.galleriesService, 'service', methodToStub, methodUnderTest, sampleGallery);
        };

        describe('getGalleries', () => {
            assertGalleriesServiceMethodCalled('getGalleries', data.getGalleries);
        });

        describe('putGallery', () => {
            assertGalleriesServiceMethodCalled('putGallery', data.putGallery, SAMPLE_GALLERY);
        });

        describe('putGallery', () => {
            assertGalleriesServiceMethodCalled('postGallery', data.postGallery, SAMPLE_GALLERY);
        });

        describe('deleteGallery', () => {
            assertGalleriesServiceMethodCalled('deleteGallery', data.deleteGallery, SAMPLE_GALLERY);
        });

        describe('deleteImage', () => {
            assertGalleriesServiceMethodCalled('deleteImage', data.deleteImage, SAMPLE_IMAGE);
        });

        describe('getGalleryStructure', () => {
            assertFunctionCalledWithSingleCallback(data.galleriesService, 'getGalleryStructure', data.getGalleryStructure);
        });
    });

    describe('Members', () => {

        const SAMPLE_MEMBER = {};

        const assertMembersServiceMethodCalled = (methodToStub, methodUnderTest, sampleMember) => {
            assertServiceMethodCalled(data.membersService, 'service', methodToStub, methodUnderTest, sampleMember);
        };

        describe('getMembers', () => {
            assertMembersServiceMethodCalled('getMembers', data.getMembers);
        });

        describe('putMember', () => {
            assertMembersServiceMethodCalled('putMember', data.putMember, SAMPLE_MEMBER);
        });

        describe('postMember', () => {
            assertMembersServiceMethodCalled('postMember', data.postMember, SAMPLE_MEMBER);
        });

        describe('deleteMember', () => {
            assertMembersServiceMethodCalled('deleteMember', data.deleteMember, SAMPLE_MEMBER);
        });

        describe('getMemberStructure', () => {
            assertFunctionCalledWithSingleCallback(data.membersService, 'getMemberStructure', data.getMemberStructure);
        });
    });
});
