import Service from "./Service";
import Endpoint from '../endpoint/Endpoint';

import { text } from '../../../src/data/formStructure/inputs';

const MEMBER_STRUCTURE = [
    {
        label: '',
        fields: {
            firstname: text,
            lastname: text,
            instrument: text
        }
    }
];

class MembersService extends Service {

    constructor() {

        super(new Endpoint('members', true, true, true));
        this.bindMemberFunctions();

    }

    bindMemberFunctions() {

        this.getMembers = this.getMembers.bind(this);
        this.putMember = this.putMember.bind(this);
        this.postMember = this.postMember.bind(this);
        this.deleteMember = this.deleteMember.bind(this);

    }

    getMembers(successCallback, errorCallback) {
        this.endpoint.getRequest(successCallback, errorCallback);
    }

    putMember(member, successCallback, errorCallback) {
        this.endpoint.putRequest(member, successCallback, errorCallback);
    }

    postMember(member, successCallback, errorCallback) {
        this.endpoint.postRequest(member, successCallback, errorCallback);
    }

    deleteMember(member, successCallback,  errorCallback) {
        this.endpoint.deleteRequest(member, successCallback, errorCallback);
    }

    getMemberStructure(callback) {
        callback(MEMBER_STRUCTURE);
    }
}

export {MEMBER_STRUCTURE, MembersService};
export default MembersService;