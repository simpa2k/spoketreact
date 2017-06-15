import React from 'react';
import EmbeddedItem from './EmbeddedItem.jsx';

class SoundPlayer extends EmbeddedItem {

    determineType(embeddedItem) {

        const anchor = document.createElement('a');
        anchor.href = embeddedItem.src;

        let hostname = anchor.hostname;
        let hostnameElements = hostname.split('.');

        // ToDo: this currently only handles urls with a subdomain, which is fine for the APIs currently used.
        return hostnameElements.length >= 2 ? hostnameElements[1] : 'default';

    };

    getAdditionalProps() {

        let style;

        switch(this.determineType(this.props.model)) {

            case('soundcloud'):

                style = {

                    width: "100%",
                    height: "166",
                    scrolling: "no",
                    frameborder: "no",

                };

                break;

            case('spotify'):

                style = {

                    width: "100%",
                    height: "380",
                    frameborder: "0",
                    allowtransparency: "true"

                };

                break;

            default:

                style = {

                width: "100%",
                height: "166",
                scrolling: "no",
                frameborder: "no",

            }
        }

        return style;

    }
}

export default SoundPlayer