import React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';

class Textbox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <CSSTransitionGroup
                transitionName="textbox"
                transitionAppear={true}
                transitionLeave={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                <div className="textbox">
                    <div className="textbox-heading">Test</div>
                    <div className="textbox-content">{this.props.content}</div>
                </div>
            </CSSTransitionGroup>
        )
    }
}

export default Textbox;