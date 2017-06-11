import React from 'react';
import SectionContainer from './SectionContainer.jsx';

class DescriptionSectionContainer extends SectionContainer {

    getContent(successCallback, errorCallback) {
        this.state.data.getDescription(successCallback, errorCallback);
    }

    parseData(data) {
        return <td dangerouslySetInnerHTML={{__html: data[0].content}} /> ;
    }
}

export default DescriptionSectionContainer;