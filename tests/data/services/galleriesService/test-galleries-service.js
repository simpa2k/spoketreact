const expect = require('chai').expect;
const sinon = require('sinon');

import {GalleriesService} from "../../../../src/data/services/GalleriesService";

describe('GalleriesService', () => {

    const SAMPLE_GALLERIES = require('./sampleGalleries.json');
    let galleriesService = new GalleriesService();

    let getRequest;

    afterEach(() => {
        getRequest.restore();
    });

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
});
