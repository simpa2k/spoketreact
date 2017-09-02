const expect = require('chai').expect;
const sinon = require('sinon');

import {GALLERY_STRUCTURE, GalleriesService} from "../../../../../src/data/services/GalleriesService";

const helperFunctions = require('../../../../helpers/helpers');
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

    describe('createFormData', () => {

        const SEVERAL_IMAGES = 5;

        let base64Image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA8Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gMTAwCv/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIBDgHgAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOfF9E128M935ty9zN5avJFBKsEUzIAFRkBVZCyIqs1xPiR/L8oS1gagt3I0s/kRX';
        let images;

        beforeEach(() => {
            images = [];
        });

        it('should append single image', () => {

            images.push(base64Image);

            let formData = galleriesService.createFormData(images);

            expect(formData.getAll('files[]').length).to.equal(1);

        });

        it('should append several images', () => {

            for (let i = 0; i < SEVERAL_IMAGES; i++) {
                images.push(base64Image);
            }

            let formData = galleriesService.createFormData(images);

            expect(formData.getAll('files[]').length).to.equal(SEVERAL_IMAGES);

        });

        it('should throw type error if array is not passed', () => {

            expect(() => {
                galleriesService.createFormData()
            }).to.throw(TypeError, 'Images must be an array');

            expect(() => {
                galleriesService.createFormData(null)
            }).to.throw(TypeError, 'Images must be an array');

            expect(() => {
                galleriesService.createFormData('string')
            }).to.throw(TypeError, 'Images must be an array');
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
