const expect = require('chai').expect;
const sinon = require('sinon');

import {GALLERY_STRUCTURE, GalleriesService} from "../../../../../src/data/services/GalleriesService";

const helperFunctions = require('../../../../helpers/helpers');
const assertCallDelegatedProperly = helperFunctions.assertCallDelegatedProperly;
const assertCallbackCalledWithFormStructure = helperFunctions.assertCallbackCalledWithFormStructure;

describe('GalleriesService', () => {

    const SAMPLE_GALLERIES = require('./sampleGalleries.json');
    const BASE_64_IMAGE = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA8Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gMTAwCv/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIBDgHgAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOfF9E128M935ty9zN5avJFBKsEUzIAFRkBVZCyIqs1xPiR/L8oS1gagt3I0s/kRX';

    const SAMPLE_UNMODIFIED_GALLERY = {

        galleryname: 'Test gallery',
        images: [
            {
                full: "images\/galleries\/Folk at Heart - 15\/FaH 1.jpg",
                thumb: "images\/galleries\/Folk at Heart - 15\/thumbnails\/FaH 1.jpg"
            },
            {
                full: "images\/galleries\/Folk at Heart - 15\/FaH 2.jpg",
                thumb: "images\/galleries\/Folk at Heart - 15\/thumbnails\/FaH 2.jpg"
            },
            {
                full: "images\/galleries\/Folk at Heart - 15\/FaH 3.jpg",
                thumb: "images\/galleries\/Folk at Heart - 15\/thumbnails\/FaH 3.jpg"
            },
            {
                full: "images\/galleries\/Folk at Heart - 15\/FaH 4.jpg",
                thumb: "images\/galleries\/Folk at Heart - 15\/thumbnails\/FaH 4.jpg"
            },
            {
                full: "images\/galleries\/Folk at Heart - 15\/FaH 5.jpg",
                thumb: "images\/galleries\/Folk at Heart - 15\/thumbnails\/FaH 5.jpg"
            }
        ]
    };

    const GALLERY_WITH_EMPTY_ARRAYS = {

        galleryname: 'Test gallery',
        images: [],
        addedImages: [],
        removedImages: []

    };

    const SAMPLE_NEW_GALLERY = {

        galleryname: 'Test gallery',
        addedImages: [BASE_64_IMAGE, BASE_64_IMAGE, BASE_64_IMAGE]

    };

    const SAMPLE_UPDATED_GALLERY = {

        galleryname: 'Test gallery',
        images: [
            {
                full: "images\/galleries\/Folk at Heart - 15\/FaH 1.jpg",
                thumb: "images\/galleries\/Folk at Heart - 15\/thumbnails\/FaH 1.jpg"
            },
            {
                full: "images\/galleries\/Folk at Heart - 15\/FaH 2.jpg",
                thumb: "images\/galleries\/Folk at Heart - 15\/thumbnails\/FaH 2.jpg"
            },
            {
                full: "images\/galleries\/Folk at Heart - 15\/FaH 3.jpg",
                thumb: "images\/galleries\/Folk at Heart - 15\/thumbnails\/FaH 3.jpg"
            },
        ],
        addedImages: [BASE_64_IMAGE, BASE_64_IMAGE, BASE_64_IMAGE],
        removedImages: [
            {
                full: "images\/galleries\/Folk at Heart - 15\/FaH 4.jpg",
                thumb: "images\/galleries\/Folk at Heart - 15\/thumbnails\/FaH 4.jpg"
            },
            {
                full: "images\/galleries\/Folk at Heart - 15\/FaH 5.jpg",
                thumb: "images\/galleries\/Folk at Heart - 15\/thumbnails\/FaH 5.jpg"
            }
        ],
        galleryCover: "images\/galleries\/Folk at Heart - 15\/galleryCover\/FaH 1.jpg"

    };

    const SAMPLE_GALLERY_TO_DELETE = {

        galleryname: 'Test gallery',
        images: [
            {
                full: "images\/galleries\/Folk at Heart - 15\/FaH 1.jpg",
                thumb: "images\/galleries\/Folk at Heart - 15\/thumbnails\/FaH 1.jpg"
            },
            {
                full: "images\/galleries\/Folk at Heart - 15\/FaH 2.jpg",
                thumb: "images\/galleries\/Folk at Heart - 15\/thumbnails\/FaH 2.jpg"
            },
            {
                full: "images\/galleries\/Folk at Heart - 15\/FaH 3.jpg",
                thumb: "images\/galleries\/Folk at Heart - 15\/thumbnails\/FaH 3.jpg"
            },
            {
                full: "images\/galleries\/Folk at Heart - 15\/FaH 4.jpg",
                thumb: "images\/galleries\/Folk at Heart - 15\/thumbnails\/FaH 4.jpg"
            },
            {
                full: "images\/galleries\/Folk at Heart - 15\/FaH 5.jpg",
                thumb: "images\/galleries\/Folk at Heart - 15\/thumbnails\/FaH 5.jpg"
            }
        ],
        galleryCover: "images\/galleries\/Folk at Heart - 15\/galleryCover\/FaH 1.jpg"

    };

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

        let images;

        beforeEach(() => {
            images = [];
        });

        it('should append single image', () => {

            images.push(BASE_64_IMAGE);

            let formData = galleriesService.createFormData(images);

            expect(formData.getAll('files[]').length).to.equal(1);

        });

        it('should append several images', () => {

            for (let i = 0; i < SEVERAL_IMAGES; i++) {
                images.push(BASE_64_IMAGE);
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

        it('should call postImages with gallery name and added images', () => {

            let stubbedMethod = sinon.stub(galleriesService, 'postImages');

            galleriesService.putGallery(SAMPLE_UPDATED_GALLERY);

            sinon.assert.calledWith(stubbedMethod,
                SAMPLE_UPDATED_GALLERY.galleryname, SAMPLE_UPDATED_GALLERY.addedImages);

            stubbedMethod.restore();

        });

        it('should not call postImages if addedImages is undefined', () => {

            let stubbedMethod = sinon.stub(galleriesService, 'postImages');

            galleriesService.putGallery(SAMPLE_UNMODIFIED_GALLERY);
            sinon.assert.notCalled(stubbedMethod);

            stubbedMethod.restore();

        });

        it('should not call postImages if addedImages is empty', () => {

            let stubbedMethod = sinon.stub(galleriesService, 'postImages');

            galleriesService.putGallery(GALLERY_WITH_EMPTY_ARRAYS);
            sinon.assert.notCalled(stubbedMethod);

            stubbedMethod.restore();

        });

        it('should call delete image with all deleted images', () => {

            let stubbedMethod = sinon.stub(galleriesService, 'deleteImage');

            galleriesService.putGallery(SAMPLE_UPDATED_GALLERY);
            expect(stubbedMethod.callCount).to.equal(SAMPLE_UPDATED_GALLERY.removedImages.length);

            stubbedMethod.restore();

        });

        it('should not call delete image if removedImages is undefined', () => {

            let stubbedMethod = sinon.stub(galleriesService, 'deleteImage');

            galleriesService.putGallery(SAMPLE_UNMODIFIED_GALLERY);
            sinon.assert.notCalled(stubbedMethod);

            stubbedMethod.restore();

        });

        it('should not call delete image if removedImages is empty', () => {

            let stubbedMethod = sinon.stub(galleriesService, 'deleteImage');

            galleriesService.putGallery(GALLERY_WITH_EMPTY_ARRAYS);
            sinon.assert.notCalled(stubbedMethod);

            stubbedMethod.restore();

        });
    });

    describe('postGallery', () => {

        it('should call postImages with gallery name, images, success callback and error callback', () => {

            let stubbedMethod = sinon.stub(galleriesService, 'postImages');

            let successCallback = () => {};
            let errorCallback = () => {};

            galleriesService.postGallery(SAMPLE_NEW_GALLERY, successCallback, errorCallback);

            sinon.assert.calledWith(stubbedMethod,
                SAMPLE_NEW_GALLERY.galleryname, SAMPLE_NEW_GALLERY.addedImages,
                successCallback, errorCallback);

            stubbedMethod.restore();

        });
    });

    describe('deleteGallery', () => {

        let stubbedRequest = sinon.stub(galleriesService.endpoint, 'deleteRequest');
        let galleryWithOnlyName = {
            galleryname: SAMPLE_GALLERY_TO_DELETE.galleryname
        };

        galleriesService.deleteGallery(SAMPLE_GALLERY_TO_DELETE);

        sinon.assert.calledWith(stubbedRequest, galleryWithOnlyName);

        stubbedRequest.restore();

    });

    describe('postImages', () => {

        it('should convert images to FormData and pass it to endpoint function', () => {

            let stubbedRequest = sinon.stub(galleriesService.imagesEndpoint, 'postForm');
            let formData = galleriesService.createFormData(SAMPLE_NEW_GALLERY.addedImages);

            galleriesService.postImages(SAMPLE_NEW_GALLERY.galleryname, SAMPLE_NEW_GALLERY.addedImages);

            sinon.assert.calledWith(stubbedRequest,
                formData, {galleryname: 'Test gallery'},
                undefined, undefined);

            stubbedRequest.restore();

        });
    });

    describe('deleteImage', () => {

        it('should call endpoint function with correct arguments', () => {

            let stubbedRequest = sinon.stub(galleriesService.imagesEndpoint, 'deleteRequest');

            let successCallback = () => {};
            let errorCallback = () => {};

            galleriesService.deleteImage(SAMPLE_UPDATED_GALLERY.removedImages[0], successCallback, errorCallback);
            sinon.assert.calledWith(stubbedRequest, SAMPLE_UPDATED_GALLERY.removedImages[0], successCallback, errorCallback);

            stubbedRequest.restore();

        });

    });

    describe('getGalleryStructure', () => {
        assertCallbackCalledWithFormStructure(GALLERY_STRUCTURE, galleriesService.getGalleryStructure);
    });
});
