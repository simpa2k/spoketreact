import React from 'react';

class Image extends React.Component {

    render() {

        return (
            <a href={'/' + this.props.full}><img src={'/' + this.props.thumb}/></a>
        )
    }
}

export default Image