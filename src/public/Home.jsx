import React from 'react';
import { Parallax } from "react-parallax";

import Data from '../data/Data.js';
import SectionContainer from "./containers/SectionContainer.jsx";
import GigsSectionContainer from "./containers/GigsSectionContainer.jsx";
import ParallaxImageContainer from "./containers/ParallaxImageContainer.jsx";
import offset from '../utils/offset.js';
import StickyNavbar from "../stickyNavbar/StickyNavbar.jsx";

class Home extends React.Component {

    constructor(props) {

        super(props);

        this.setMainDivY = this.setMainDivY.bind(this);

        this.state = {
            data: new Data()
        };

        this.onSiteNavItems = [];
        this.offSiteNavItems = [];

    }

    componentDidMount() {

        this.setMainDivY();
        this.findLinks();
        window.addEventListener('scroll', this.setMainDivY);

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.setMainDivY);
    }

    setMainDivY() {
        this.setState({mainDivY: offset(this.mainDiv).top});
    }

    findLinks() {

        this.onSiteNavItems = [

            {
                name: 'KONSERTER',
                destination: this.gigsSection.getTop()

            },
            {
                name: 'OM SPÖKET',
                destination: this.aboutSection.getTop()
            },
            {
                name: 'MEDLEMMAR',
                destination: this.memberSection.getTop()
            },
            {
                name: 'MUSIK OCH MEDIA',
                destination: this.mediaSection.getTop()
            },
            {
                name: 'KONTAKT',
                destination: this.contactSection.getTop()
            }
        ];

        this.offSiteNavItems = [
            {
                src: 'facebooklogga_29.png',
                destination: 'https://www.facebook.com',
                imageText: ''
            },
            {
                src: 'spotify_29.png',
                destination: 'https://www.spotify.com',
                imageText: ''
            },
            {
                src: 'yt29.png',
                destination: 'https://www.youtube.com',
                imageText: ''
            }
        ];
    }

    render() {

        return (

            <div>

                <div id="background">
                    <ParallaxImageContainer imageName={'thenewstove_text.jpg'} background={true} />
                </div>

                <StickyNavbar headings={this.onSiteNavItems}
                              socialMedia={this.offSiteNavItems}
                              elementToStickToY={this.state.mainDivY} />

                <div id="main" ref={(mainDiv) => { this.mainDiv = mainDiv; }}>

                    <GigsSectionContainer heading="KOMMANDE KONSERTER"
                                          data={this.state.data}
                                          ref={(gigsSection) => { this.gigsSection = gigsSection; }}/>

                    <ParallaxImageContainer imageName={'about.jpg'} />

                    <SectionContainer heading="OM SPÖKET"
                                      ref={(aboutSection) => { this.aboutSection = aboutSection; }}
                                      getContent={() => {
                        return <p>{this.state.data.getDescription()}</p>
                    }} />

                    <SectionContainer heading="SPÖKET ÄR"
                                      data={this.state.data}
                                      ref={(memberSection) => { this.memberSection = memberSection; }} />

                    <SectionContainer heading="MUSIK OCH MEDIA"
                                      data={this.state.data}
                                      ref={(mediaSection) => { this.mediaSection = mediaSection; }}/>

                    <SectionContainer heading="KONTAKT"
                                      data={this.state.data}
                                      ref={(contactSection) => {this.contactSection = contactSection; }}/>

                </div>
            </div>

        );
    }
}

export default Home;
