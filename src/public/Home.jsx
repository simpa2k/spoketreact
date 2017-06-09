import React from 'react';
import Data from '../data/Data.js';

import SectionContainer from "./containers/SectionContainer.jsx";
import GigsSectionContainer from "./containers/GigsSectionContainer.jsx";
import ParallaxImageContainer from "./containers/ParallaxImageContainer.jsx";
import { Parallax } from "react-parallax";

class Home extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            data: new Data()
        }

    }

    render() {

        const onSiteNavItems = [
            {
                path: '/news',
                label: 'NYHETER'
            },
            {
                path: '/gigs',
                label: 'KONSERTER'
            },
            {
                path: '/contact',
                label: 'KONTAKT'
            }
        ];

        const offSiteNavItems = [
            {
                path: 'https://www.facebook.com',
                label: 'facebooklogga_29.png'
            },
            {
                path: 'https://www.spotify.com',
                label: 'spotify_29.png'
            },
            {
                path: 'https://www.youtube.com',
                label: 'yt29.png'
            }
        ];

        return (

            <div>

                <div id="background">
                    <ParallaxImageContainer imageName={'thenewstove_text.jpg'} background={true} />
                </div>

                <div id="home">

                    <GigsSectionContainer heading="KOMMANDE KONSERTER" data={this.state.data}/>

                    <ParallaxImageContainer imageName={'about.jpg'} />

                    <SectionContainer heading="OM SPÖKET" getContent={() => {
                        return <p>{this.state.data.getDescription()}</p>
                    }} />

                    <SectionContainer heading="SPÖKET ÄR" data={this.state.data} />
                    <SectionContainer heading="MUSIK OCH MEDIA" data={this.state.data} />
                    <SectionContainer heading="KONTAKT" data={this.state.data} />

                </div>
            </div>

        );
    }
}

export default Home;
