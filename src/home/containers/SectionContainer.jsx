import React from 'react';
import Section from '../presentational/Section.jsx';
import offset from '../../utils/offset.js';

class SectionContainer extends React.Component {

    constructor(props) {

       super(props);

       this.state = {
           data: this.props.data,
           content: []
       };
    }

    componentDidMount() {

        this.getContent((content) => {
            this.setState({content: this.parseData(content)});
        });
    }

    getTop() {
        return offset(this.sectionDiv).top;
    }

    getHeading() {
        return this.props.heading;
    }

    getContent(successCallback, errorCallback) {

        if (typeof(this.props.getContent) === 'function') {
            return this.props.getContent(successCallback, errorCallback);
        }
    }

    /*
     * Most of the implementations of this function
     * are concerned with presentation. Might be an
     * idea to try to delegate this to a presentational
     * component.
     */
    parseData(data) {
        return data;
    }

    render() {

        return (
            <div ref={(sectionDiv) => { this.sectionDiv = sectionDiv }}>
                <Section heading={this.getHeading()}>{this.state.content}</Section>
            </div>
        )
    }
}

export default SectionContainer;