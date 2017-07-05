import React from 'react';

class EmbeddedItem extends React.Component {

    getSrc() {
        return this.props.model.src;
    }

    getAdditionalProps() {

    }

    render() {

        return (
            <iframe src={this.getSrc()} {...this.getAdditionalProps()} />
        )
    }
}

export default EmbeddedItem