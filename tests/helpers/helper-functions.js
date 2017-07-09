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

module.exports = {
    assertCallDelegatedProperly: assertCallDelegatedProperly
};
