import React from 'react';
import SectionContainer from './SectionContainer.jsx';

class DescriptionSectionContainer extends SectionContainer {

    getContent(successCallback, errorCallback) {
        this.state.data.getDescription(successCallback, errorCallback);
    }

    parseData(data) {
        return <p>{data}</p>
    }

}

export default DescriptionSectionContainer;