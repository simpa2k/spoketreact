const expect = require('chai').expect;
const sinon = require('sinon');

import {VIDEO_STRUCTURE, SOUND_STRUCTURE, EmbeddedItemsService} from '../../../../src/data/services/EmbeddedItemsService';

const helperFunctions = require('../../../helpers/helper-functions');

const assertCallDelegatedProperly = helperFunctions.assertCallDelegatedProperly;
const assertCallbackCalledWithFormStructure = helperFunctions.assertCallbackCalledWithFormStructure;

describe('EmbeddedItemsService', () => {

    /*
     * Utils
     */

    const SAMPLE_EMBEDDED_ITEMS = require('./sampleEmbeddedItems.json');

    const filterEmbeddedItemsOnType = (type) => {

        return SAMPLE_EMBEDDED_ITEMS.filter((embeddedItem) => {
            return embeddedItem.type === type;
        });
    };

    const SAMPLE_VIDEOS = filterEmbeddedItemsOnType('video');
    const SAMPLE_SOUNDS = filterEmbeddedItemsOnType('sound');

    let embeddedItemsService = new EmbeddedItemsService();

    const assertEmbeddedItemsEndpointFunctionCalled = (functionToStub, functionUnderTest, sampleEmbeddedItem) => {
        assertCallDelegatedProperly(embeddedItemsService.endpoint, 'endpoint', functionToStub, functionUnderTest, sampleEmbeddedItem);
    };

    const assertEmbeddedItemsEndpointFunctionCalledWithType = (functionUnderTest, type) => {

        it('should call endpoint function with ' + type + ' as parameter', () => {

            let getRequest = sinon.stub(embeddedItemsService.endpoint, 'getRequest');

            let successCallback = sinon.spy();
            let errorCallback = sinon.spy();
            let parameters = {
                type: type
            };

            functionUnderTest(successCallback, errorCallback);
            sinon.assert.calledWith(getRequest, sinon.match.any, sinon.match.any, sinon.match.any, parameters);

            getRequest.restore();

        });

    };

    const assertCallsSuccessCallback = (functionToStub, functionUnderTest, embeddedItemType) => {

        it('should call success callback on valid request', () => {

            let functionStub = sinon.stub(embeddedItemsService.endpoint, functionToStub);

            let successCallback = sinon.spy();
            let errorCallback = sinon.spy();
            let responseFormat = null;
            let parameters = {
                type: embeddedItemType
            };

            functionStub.withArgs(sinon.match.any, errorCallback, responseFormat, parameters).yields(SAMPLE_VIDEOS);

            functionUnderTest(successCallback, errorCallback);
            sinon.assert.calledOnce(successCallback);

            functionStub.restore();

        });
    };

    const assertTypeSet = (functionToStub, functionUnderTest, item, type) => {

        let functionStub = sinon.stub(embeddedItemsService.endpoint, functionToStub);

        delete item.type;

        functionUnderTest(item, null, null);
        expect(functionStub.args[0][0].type).to.equal(type);

        functionStub.restore();

    };

    const assertSetsExternalIds = (functionUnderTest, sampleItems) => {

        it('should set external ids', () => {

            let getRequest = sinon.stub(embeddedItemsService.endpoint, 'getRequest');

            let successCallback = sinon.spy((items) => {

                items.forEach((item) => {
                    expect(typeof(item.externalId)).to.not.equal('undefined');
                });
            });

            getRequest.yields(sampleItems);
            functionUnderTest(successCallback, null);

            getRequest.restore();

        });
    };

    const assertVideoTypeSet = (functionToStub, functionUnderTest) => {
        assertTypeSet(functionToStub, functionUnderTest, SAMPLE_VIDEOS[0], 'video');
    };

    const assertSoundTypeSet = (functionToStub, functionUnderTest) => {
        assertTypeSet(functionToStub, functionUnderTest, SAMPLE_SOUNDS[0], 'sound');
    };

    /*
     * General
     */

    describe('getEmbeddedItems', () => {

        it('should get embedded items', () => {

            let getRequest = sinon.stub(embeddedItemsService.endpoint, 'getRequest');
            getRequest.yields(SAMPLE_EMBEDDED_ITEMS);

            let successCallback = sinon.spy((embeddedItems) => {
                expect(embeddedItems).to.equal(SAMPLE_EMBEDDED_ITEMS);
            });

            let errorCallback = sinon.spy();

            embeddedItemsService.getEmbeddedItems(successCallback, errorCallback);
            sinon.assert.calledWith(successCallback, SAMPLE_EMBEDDED_ITEMS);

            getRequest.restore();

        });
    });

    describe('putEmbeddedItem', () => {
        assertEmbeddedItemsEndpointFunctionCalled('putRequest', embeddedItemsService.putEmbeddedItem, SAMPLE_EMBEDDED_ITEMS[0]);
    });

    describe('postEmbeddedItem', () => {
        assertEmbeddedItemsEndpointFunctionCalled('postRequest', embeddedItemsService.postEmbeddedItem, SAMPLE_EMBEDDED_ITEMS[0]);
    });

    describe('deleteEmbeddedItem', () => {
        assertEmbeddedItemsEndpointFunctionCalled('deleteRequest', embeddedItemsService.deleteEmbeddedItem, SAMPLE_EMBEDDED_ITEMS[0]);
    });

    /*
     * Videos
     */

    describe('getVideos', () => {

        assertEmbeddedItemsEndpointFunctionCalledWithType(embeddedItemsService.getVideos, 'video');
        assertCallsSuccessCallback('getRequest', embeddedItemsService.getVideos, 'video');
        assertSetsExternalIds(embeddedItemsService.getVideos, SAMPLE_VIDEOS);

    });

    describe('putVideo', () => {

        assertEmbeddedItemsEndpointFunctionCalled('putRequest', embeddedItemsService.putVideo, SAMPLE_EMBEDDED_ITEMS[0]);
        assertVideoTypeSet('putRequest', embeddedItemsService.putVideo);

    });

    describe('postVideo', () => {

        assertEmbeddedItemsEndpointFunctionCalled('postRequest', embeddedItemsService.postVideo, SAMPLE_EMBEDDED_ITEMS[0]);
        assertVideoTypeSet('postRequest', embeddedItemsService.postVideo);

    });

    describe('getVideoStructure', () => {
        assertCallbackCalledWithFormStructure(VIDEO_STRUCTURE, embeddedItemsService.getVideoStructure);
    });

    /*
     * Sounds
     */

    describe('getSounds', () => {

        assertEmbeddedItemsEndpointFunctionCalledWithType(embeddedItemsService.getSounds, 'sound');
        assertCallsSuccessCallback('getRequest', embeddedItemsService.getSounds, 'sound');
        assertSetsExternalIds(embeddedItemsService.getSounds, SAMPLE_SOUNDS);

    });

    describe('getSoundStructure', () => {
       assertCallbackCalledWithFormStructure(SOUND_STRUCTURE, embeddedItemsService.getSoundStructure);
    });
});
