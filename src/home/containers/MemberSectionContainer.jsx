import React from 'react';
import SectionContainer from './SectionContainer.jsx';
import Member from '../presentational/Member.jsx';

class MemberSectionContainer extends SectionContainer {

    getContent(successCallback, errorCallback) {
        this.state.data.getMembers(successCallback, errorCallback);
    }

    parseData(data) {

        return data.map((member, index) => {
            return <Member key={member + '-' + index} data={member} index={index} />
        });
    }
}

export default MemberSectionContainer;