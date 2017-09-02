const expect = require('chai').expect;
const sinon = require('sinon');

const Endpoint = require('../../../../src/data/endpoint/Endpoint');

describe('Endpoint', () => {

    const TEST_ENDPOINT_NAME = 'testendpoint';

    const ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS = new Endpoint(TEST_ENDPOINT_NAME, true, true, true);
    const ENDPOINT_WITH_NO_FUNCTIONS = new Endpoint(TEST_ENDPOINT_NAME, false, false, false);

    const SAMPLE_OBJECT = {
        id: 1,
        content: 'This is just a test'
    };

    let stubEndpointFunction = (functionToStub) => {
        return sinon.stub(ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS, functionToStub);
    };

    let stubEndpointRequest = (request) => {
        return sinon.stub(ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS.requests, request);
    };

    let stubPostRequest = () => {
        return stubEndpointRequest('postRequest');
    };

    it('should create functions when passing true values to constructor', () => {

        expect(ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS.putRequest).to.not.equal(undefined);
        expect(ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS.postRequest).to.not.equal(undefined);
        expect(ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS.deleteRequest).to.not.equal(undefined);

    });

    it('should not create functions when passing false values to constructor', () => {

        expect(ENDPOINT_WITH_NO_FUNCTIONS.putRequest).to.equal(undefined);
        expect(ENDPOINT_WITH_NO_FUNCTIONS.postRequest).to.equal(undefined);
        expect(ENDPOINT_WITH_NO_FUNCTIONS.deleteRequest).to.equal(undefined);

    });

    describe('sendObject', () => {

        let stubbedRequest = stubPostRequest();

        ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS.sendObject(ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS.requests.postRequest, SAMPLE_OBJECT, {}, {});

        sinon.assert.calledWith(stubbedRequest, ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS.endpointName, {}, {
            body: SAMPLE_OBJECT,
            headers: {'Content-Type': 'application/json'}
        }, undefined, undefined, undefined);

        stubbedRequest.restore();

    });

    describe('sendStringifiedObject', () => {

        let stubbedRequest = stubPostRequest();

        ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS.sendStringifiedObject(ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS.requests.postRequest, SAMPLE_OBJECT, {}, {});

        sinon.assert.calledWith(stubbedRequest, ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS.endpointName, {}, {
            body: JSON.stringify(SAMPLE_OBJECT),
            headers: {'Content-Type': 'application/json'}
        }, undefined, undefined, undefined);

        stubbedRequest.restore();

    });

    describe('postObject', () => {

        it('should call sendStringifiedObject with correct arguments', () => {

            let stubbedRequest = stubEndpointFunction('sendStringifiedObject');

            ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS.postRequest(SAMPLE_OBJECT);

            sinon.assert.calledWith(stubbedRequest, ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS.requests.postRequest,
                SAMPLE_OBJECT, {}, {}, undefined, undefined, undefined);

            stubbedRequest.restore();

        });
    });

    describe('postForm', () => {

        it('should call sendObject with correct arguments', () => {

            let formData = new window.FormData();

            formData.append('username', 'username');
            formData.append('password', 'password');

            let stubbedRequest = stubEndpointFunction('sendObject');

            ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS.postForm(formData);

            sinon.assert.calledWith(stubbedRequest, ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS.requests.postRequest,
                formData, {}, {}, undefined, undefined, undefined);

            stubbedRequest.restore();

        });
    });

    describe('putObject', () => {

        it('should call sendStringifiedObject with correct arguments', () => {

            let stubbedRequest = stubEndpointFunction('sendStringifiedObject');

            ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS.putRequest(SAMPLE_OBJECT);

            sinon.assert.calledWith(stubbedRequest, ENDPOINT_WITH_COMPLETE_SET_OF_FUNCTIONS.requests.putRequest,
                SAMPLE_OBJECT, {}, {}, undefined, undefined, undefined);

            stubbedRequest.restore();

        });

    });
});
