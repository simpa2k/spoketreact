const expect = require('chai').expect;
const sinon = require('sinon');

import {MEMBER_STRUCTURE, MembersService} from "../../../../../src/data/services/MembersService";

const helperFunctions = require('../../../../helpers/helpers');
const assertCallDelegatedProperly = helperFunctions.assertCallDelegatedProperly;
const assertCallbackCalledWithFormStructure = helperFunctions.assertCallbackCalledWithFormStructure;

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

    describe('putMember', () => {
        assertMembersEndpointFunctionCalled('putRequest', membersService.putMember, SAMPLE_MEMBERS[0]);
    });

    describe('postMember', () => {
        assertMembersEndpointFunctionCalled('postRequest', membersService.postMember, SAMPLE_MEMBERS[0]);
    });

    describe('deleteMember', () => {
        assertMembersEndpointFunctionCalled('deleteRequest', membersService.deleteMember, SAMPLE_MEMBERS[0]);
    });

    describe('getMemberStructure', () => {
        assertCallbackCalledWithFormStructure(MEMBER_STRUCTURE, membersService.getMemberStructure);
    });
});

