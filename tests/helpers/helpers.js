const expect = require('chai').expect;
const sinon = require('sinon');
const fetch = require('isomorphic-fetch');

let secrets = require('../../secrets');

const SERVER_ROOT = 'http://localhost:8080/backend/server.php';

let credentials = {
    username: secrets.sampleUsername,
    authToken: secrets.sampleToken
};

localStorage = {
    getItem(key) { return credentials[key]; },
    setItem() {}
};

const assertCallDelegatedProperly = (delegatee, delegateeName, functionToStub, functionUnderTest, sampleObject) => {

    let should = 'should call ' + delegateeName + ' function with ';

    if (sampleObject) {
        should += 'object, ';
    }

    should += 'success callback and error callback';

    it(should, () => {

        let functionStub = sinon.stub(delegatee, functionToStub);

        let successCallback = sinon.spy();
        let errorCallback = sinon.spy();

        if (sampleObject) {

            functionUnderTest(sampleObject, successCallback, errorCallback);
            sinon.assert.calledWith(functionStub, sampleObject, successCallback, errorCallback);

        } else {

            functionUnderTest(successCallback, errorCallback);
            sinon.assert.calledWith(functionStub, successCallback, errorCallback);

        }

        functionStub.restore();

    });
};

const assertFunctionCalledWithSingleCallback = (functionOwner, functionToStub, functionUnderTest) => {

    it('should call function with callback', () => {

        let functionStub = sinon.stub(functionOwner, functionToStub);
        let callback = sinon.spy();

        functionUnderTest(callback);
        sinon.assert.calledWith(functionStub, callback);

    });
};

const assertCallbackCalledWithFormStructure = (formStructure, functionUnderTest) => {

    it('should call callback with form structure', () => {

        let successCallbackSpy = sinon.spy((returnedFormStructure) => {
            expect(returnedFormStructure).to.equal(formStructure);
        });

        functionUnderTest(successCallbackSpy);
        sinon.assert.calledWith(successCallbackSpy, formStructure);

    });
};

const createOptions = (objectToSend) => {

    return {
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(objectToSend)
    }
};

const assertRequestCalledWith = (serviceToStub, requestMethod, functionUnderTest, objectToBeSent, parameters, options) => {

    it('should provide correct arguments for ' + requestMethod, () => {

        let stubbedRequest = sinon.stub(serviceToStub.endpoint.requests, requestMethod.toLowerCase() + 'Request');

        let successCallback = () => {};
        let errorCallback = () => {};

        if (objectToBeSent) {
            functionUnderTest(objectToBeSent, successCallback, errorCallback);
        }

        sinon.assert.calledWith(stubbedRequest, serviceToStub.endpoint.endpointName, parameters, options, successCallback, errorCallback, undefined);

    });
};

const assertProvidesCorrectArgumentsToRequestFunction = {

    objectAsParameters: (serviceToStub, requestMethod, functionUnderTest, objectToBeSent) => {
        assertRequestCalledWith(serviceToStub, requestMethod, functionUnderTest, objectToBeSent, objectToBeSent, {});
    },
    objectAsOptions: (serviceToStub, requestMethod, functionUnderTest, objectToBeSent) => {
        assertRequestCalledWith(serviceToStub, requestMethod, functionUnderTest, objectToBeSent, {}, createOptions(objectToBeSent));
    }
};

/*
 * It might have been an idea to just use the requests library.
 * However, since these are test helpers they shouldn't be using
 * the code that is being tested.
 */
const login = (successCallback, errorCallback) => {

    fetch(SERVER_ROOT + '/users?username=' + secrets.sampleUsername + '&password=' + secrets.samplePassword, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((json) => {

        credentials.authToken = json.token;
        successCallback(json.token);

    }).catch((error) => {
        errorCallback(error);
    });
};

module.exports = {

    serverRoot: SERVER_ROOT,
    sampleUsername: credentials.username,
    sampleToken: credentials.authToken,
    localStorage: localStorage,
    assertCallDelegatedProperly: assertCallDelegatedProperly,
    assertFunctionCalledWithSingleCallback: assertFunctionCalledWithSingleCallback,
    assertCallbackCalledWithFormStructure: assertCallbackCalledWithFormStructure,
    assertProvidesCorrectArgumentsToRequestFunction: assertProvidesCorrectArgumentsToRequestFunction,
    login: login

};
