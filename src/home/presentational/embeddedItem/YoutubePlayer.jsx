import React from 'react';
import EmbeddedItem from './EmbeddedItem.jsx';

class YoutubePlayer extends EmbeddedItem {

    getProps() {

        return {

            width: "560",
            height: "315",
            frameborder: "0",

        }
    }
}

export default YoutubePlayer