const expect = require('chai').expect;
const sinon = require('sinon');

import MembersService from "../../../../src/data/services/MembersService";

const helperFunctions = require('../../../helpers/helper-functions');
const assertCallDelegatedProperly = helperFunctions.assertCallDelegatedProperly;

describe('MembersService', () => {

    const SAMPLE_MEMBERS = require('./sampleMembers.json');
    let membersService = new MembersService();

    const assertMembersEndpointFunctionCalled = (functionToStub, functionUnderTest, sampleMember) => {
        assertCallDelegatedProperly(membersService.endpoint, 'endpoint', functionToStub, functionUnderTest, sampleMember);
    };

    describe('getMembers', () => {

        assertMembersEndpointFunctionCalled('getRequest', membersService.getMembers);

        it('should call success callback', () => {

            let getRequest = sinon.stub(membersService.endpoint, 'getRequest');
            getRequest.yields(SAMPLE_MEMBERS);

            let successCallback = sinon.spy();

            membersService.getMembers(successCallback);

            sinon.assert.calledOnce(successCallback);

        });
    });
});

