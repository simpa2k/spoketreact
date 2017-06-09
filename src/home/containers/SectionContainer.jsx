import React from 'react';
import Section from '../presentational/Section.jsx';
import offset from '../../utils/offset.js';

class SectionContainer extends React.Component {

    constructor(props) {

       super(props);
       this.state = {
           data: this.props.data
       };
    }

    getTop() {
        return offset(this.sectionDiv).top;
    }

    getHeading() {
        return this.props.heading;
    }

    getContent() {

        if (typeof(this.props.getContent) === 'function') {
            return this.props.getContent();
        }
    }

    render() {

        return (
            <div ref={(sectionDiv) => { this.sectionDiv = sectionDiv }}>
                <Section heading={this.getHeading()}>{this.getContent()}</Section>
            </div>
        )
    }
}

export default SectionContainer;