import React from 'react';
import Gig from './Gig.jsx';

function Gigs(props) {

    return (
        <div id="gigs-container" className="selectable-container">
            {props.gigs.map((item, index) =>
                <Gig key={index} model={item} click={props.click} />
            )}
        </div>
    );
}

export default Gigs;