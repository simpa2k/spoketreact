import React from 'react';
import CSSTransitionGroup from 'react-transition-group';

function SocialMediaText(props) {
    return (

        <div>
            <CSSTransitionGroup transitionName={"sm"}
                                transitionEnterTimeout={200}
                                transitionLeaveTimeout={200} >
            {props.text}
            </CSSTransitionGroup>
        </div>

    );
}

export default SocialMediaText;