import React from 'react';

import SectionContainer from './SectionContainer.jsx';
import Gig from '../presentational/Gig.jsx';

class GigsSectionContainer extends SectionContainer {

    getContent() {

        return this.state.data.getGigs().map((gig, index) => {
            return <Gig key={index} data={gig} />;
        });
    }
}

export default GigsSectionContainer;