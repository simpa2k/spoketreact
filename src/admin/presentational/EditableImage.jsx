import React from 'react';

class EditableImage extends React.Component {

    render() {

        return (

            <div className="gallery-item">

                <img src={'/' + this.props.thumb} />
                <div className="btn-group-vertical edit-image">
                    <button className="btn btn-danger" onClick={() => this.props.delete() }>Ta bort</button>
                    <button className="btn btn-primary" onClick={() => this.props.setGalleryCover() }>Använd som omslag</button>
                </div>

            </div>
        )
    }
}

export default EditableImage