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