import React from 'react';

import SectionContainer from './SectionContainer.jsx';
import Gig from '../presentational/Gig.jsx';

class GigsSectionContainer extends SectionContainer {

    getContent(successCallback, errorCallback) {
        this.state.data.getGigs(successCallback, errorCallback);
    }

    parseData(data) {

        return data.map((gig, index) => {
            return <Gig key={index} data={gig} />
        });
    }
}

export default GigsSectionContainer;