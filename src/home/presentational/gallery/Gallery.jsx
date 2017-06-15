import React from 'react';

class Gallery extends React.Component {

    render() {

        return (
            <img src={'/' + this.props.model.galleryCover} onClick={this.props.onClick} />
        )
    }
}

export default Gallery