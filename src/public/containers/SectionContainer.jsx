import React from 'react';
import Section from '../presentational/Section.jsx';

class SectionContainer extends React.Component {

    constructor(props) {

       super(props);
       this.state = {
           data: this.props.data
       };
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
            <Section heading={this.getHeading()}>{this.getContent()}</Section>
        )
    }
}

export default SectionContainer;