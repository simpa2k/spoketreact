const expect = require('chai').expect;
const sinon = require('sinon');

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

module.exports = {

    assertCallDelegatedProperly: assertCallDelegatedProperly,
    assertFunctionCalledWithSingleCallback: assertFunctionCalledWithSingleCallback,
    assertCallbackCalledWithFormStructure

};
