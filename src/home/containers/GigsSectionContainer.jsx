import React from 'react';

import SectionContainer from './SectionContainer.jsx';
import Gig from '../presentational/Gig.jsx';
import Gigs from '../presentational/Gigs.jsx';

class GigsSectionContainer extends SectionContainer {

    getContent(successCallback, errorCallback) {
        this.state.data.getGigs(successCallback, errorCallback);
    }

    parseData(data) {

        /*return data.map((gig, index) => {
            return <Gig key={index} data={gig} />
        });*/
        return <Gigs gigs={data} />
    }
}

export default GigsSectionContainer;