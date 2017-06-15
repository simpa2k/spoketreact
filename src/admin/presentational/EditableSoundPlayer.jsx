import React from 'react';
import EditableEmbeddedItem from './EditableEmbeddedItem.jsx';
import SoundPlayer from '../../home/presentational/embeddedItem/SoundPlayer.jsx';

class EditableSoundPlayer extends EditableEmbeddedItem {

    getEmbeddedItem() {
        return <SoundPlayer model={this.props.model} />
    }
}

export default EditableSoundPlayer