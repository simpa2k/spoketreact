import React from 'react';
import YoutubePlayer from '../../home/presentational/embeddedItem/YoutubePlayer.jsx';
import EditableEmbeddedItem from './EditableEmbeddedItem.jsx';

class EditableYoutubePlayer extends EditableEmbeddedItem {

    getEmbeddedItem() {
        return <YoutubePlayer model={this.props.model} />
    }
}

export default EditableYoutubePlayer