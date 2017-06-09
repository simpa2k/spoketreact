import React from 'react';
import { Parallax, Background } from 'react-parallax';

class ParallaxImageContainer extends React.Component {

    buildParallaxComponents() {

        const image = require('../../../dist/images/' + this.props.imageName);

        if (!this.props.background) {
            return <Parallax strength={100} bgImage={image} />;
        }

        return <Parallax strength={100}><Background><img src={image} /></Background></Parallax>;

    }

    render() {

        return (

            <div>{this.buildParallaxComponents()}</div>

        )
    }
}

export default ParallaxImageContainer;