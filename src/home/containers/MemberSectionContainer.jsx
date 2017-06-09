import React from 'react';
import SectionContainer from './SectionContainer.jsx';

class MemberSectionContainer extends SectionContainer {

    getContent(successCallback, errorCallback) {
        this.state.data.getMembers(successCallback, errorCallback);
    }

    parseData(data) {

        return data.map((member, index) => {
            return <p key={index}>{member.firstname} {member.lastname} - {member.instrument}</p>;
        });
    }
}

export default MemberSectionContainer;