const expect = require('chai').expect;
const sinon = require('sinon');

import {GALLERY_STRUCTURE, GalleriesService} from "../../../../../src/data/services/GalleriesService";

const helperFunctions = require('../../../../helpers/helper-functions');
const assertCallDelegatedProperly = helperFunctions.assertCallDelegatedProperly;
const assertCallbackCalledWithFormStructure = helperFunctions.assertCallbackCalledWithFormStructure;

describe('GalleriesService', () => {

    const SAMPLE_GALLERIES = require('./sampleGalleries.json');
    let galleriesService = new GalleriesService();

    let getRequest;

    afterEach(() => {
        getRequest.restore();
    });

    const assertGalleriesEndpointFunctionCalled = (functionToStub, functionUnderTest, sampleGallery) => {
        assertCallDelegatedProperly(galleriesService.endpoint, 'endpoint', functionToStub, functionUnderTest, sampleGallery);
    };

    describe('getGalleries', () => {

        it('should call success callback', () => {

            getRequest = sinon.stub(galleriesService.endpoint, 'getRequest');
            getRequest.yields(SAMPLE_GALLERIES);

            let successCallback = sinon.spy();

            galleriesService.getGalleries(successCallback, null);

            sinon.assert.calledOnce(successCallback);

        });

        it('should present galleries as an array', () => {

            getRequest = sinon.stub(galleriesService.endpoint, 'getRequest');
            getRequest.yields(SAMPLE_GALLERIES);

            let successCallback = sinon.spy((galleries) => {
                expect(Array.isArray(galleries)).to.be.true;
            });

            galleriesService.getGalleries(successCallback, null);

        });

        it('should present gallery images as an array', () => {

            getRequest = sinon.stub(galleriesService.endpoint, 'getRequest');
            getRequest.yields(SAMPLE_GALLERIES);

            let successCallback = sinon.spy((galleries) => {

                galleries.forEach((gallery) => {
                    expect(Array.isArray(gallery.images)).to.be.true;
                });
            });

            galleriesService.getGalleries(successCallback, null);

        });
    });

    describe('putGallery', () => {
        assertGalleriesEndpointFunctionCalled('putRequest', galleriesService.putGallery, SAMPLE_GALLERIES[0]);
    });

    describe('postGallery', () => {
        assertGalleriesEndpointFunctionCalled('postRequest', galleriesService.postGallery, SAMPLE_GALLERIES[0]);
    });

    describe('deleteGallery', () => {
        assertGalleriesEndpointFunctionCalled('deleteRequest', galleriesService.deleteGallery, SAMPLE_GALLERIES[0]);
    });

    describe('getGalleryStructure', () => {
        assertCallbackCalledWithFormStructure(GALLERY_STRUCTURE, galleriesService.getGalleryStructure);
    });
});
