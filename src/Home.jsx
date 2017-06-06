import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Data from './Data.js';
import Navbar from './navbar/Navbar.jsx'
import TextboxContainer from "./containers/TextboxContainer.jsx";
import Test from './presentational/Test.jsx';

class Home extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            data: new Data()
        }

    }

    getTextboxes() {

        return this.state.data.getNewsItems().map((element) => {
            return React.createElement('p', {}, element);
        });
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

        const content = this.getTextboxes();

        return (

            <div id="home">

                <Navbar id="off-site-navigation" items={offSiteNavItems} />
                <Navbar id="on-site-navigation" items={onSiteNavItems} />

                <Switch>
                    <Route path="/news" render={() => {
                        return <TextboxContainer textItems={content} />
                    }} />
                </Switch>

            </div>
        );
    }
}

export default Home;
