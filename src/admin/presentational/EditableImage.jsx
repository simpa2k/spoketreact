import React from 'react';

class EditableImage extends React.Component {

    render() {

        return (

            <div className="gallery-item">

                <img src={'/' + this.props.thumb} />
                <div className="btn-group-vertical edit-image">
                    <button className="btn btn-danger" onClick={(event) => {

                        event.preventDefault();
                        this.props.delete()

                    }}>Ta bort</button>

                    <button className="btn btn-primary" onClick={(event) => {

                        event.preventDefault();
                        this.props.setGalleryCover(this.props.full)

                    }}>Använd som omslag</button>
                </div>

            </div>
        )
    }
}

export default EditableImage