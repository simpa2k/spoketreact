const expect = require('chai').expect;
const sinon = require('sinon');

import {DESCRIPTION_STRUCTURE, DescriptionService} from '../../../../../src/data/services/DescriptionService';

describe('DescriptionService', () => {

    const SAMPLE_DESCRIPTION_RESPONSE = require('./sampleDescriptionResponse.json');
    const SAMPLE_DESCRIPTION = SAMPLE_DESCRIPTION_RESPONSE[0]; // For some reason the description is returned as an array

    let descriptionService;

    beforeEach(() => {
        descriptionService = new DescriptionService();
    });

    describe('getDescription', () => {

        it('should return a description on getting description', () => {

            let getRequest = sinon.stub(descriptionService.endpoint, 'getRequest');

            getRequest.yields(SAMPLE_DESCRIPTION_RESPONSE);

            let successCallbackSpy = sinon.spy((sampleDescription) => {
                expect(sampleDescription).to.equal(SAMPLE_DESCRIPTION);
            });

            descriptionService.getDescription(successCallbackSpy);

            sinon.assert.calledWith(successCallbackSpy, SAMPLE_DESCRIPTION);

        });
    });

    describe('putDescription', () => {

        it('should call endpoint put function with object, success callback and error callback', () => {

            let putRequest = sinon.stub(descriptionService.endpoint, 'putRequest');

            let successCallback = sinon.spy();
            let errorCallback = sinon.spy();

            descriptionService.putDescription(SAMPLE_DESCRIPTION, successCallback, errorCallback);
            sinon.assert.calledWith(putRequest, SAMPLE_DESCRIPTION, successCallback, errorCallback);

        });
    });

    describe('getDescriptionStructure', () => {

        it('should call callback with description structure constant', () => {

            let successCallbackSpy = sinon.spy((descriptionStructure) => {
                expect(descriptionStructure).to.equal(DESCRIPTION_STRUCTURE);
            });

            descriptionService.getDescriptionStructure(successCallbackSpy);
            sinon.assert.calledWith(successCallbackSpy, DESCRIPTION_STRUCTURE);

        });
    });
});
