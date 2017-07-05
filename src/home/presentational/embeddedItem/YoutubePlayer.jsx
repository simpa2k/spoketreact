import React from 'react';
import EmbeddedItem from './EmbeddedItem.jsx';

class YoutubePlayer extends EmbeddedItem {

    getAdditionalProps() {

        return {

            width: "560",
            height: "315",
            frameborder: "0",

        }
    }
}

export default YoutubePlayer