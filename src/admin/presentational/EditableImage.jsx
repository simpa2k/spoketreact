import React from 'react';

class EditableImage extends React.Component {

    createEditingButtons() {

        let buttons = [];

        if (this.props.delete) {

            buttons.push(
                <button className="btn btn-danger" onClick={(event) => {

                event.preventDefault();
                this.props.delete()

                }}>Ta bort</button>
            )
        }

        if (this.props.restore) {

            buttons.push(
                <button className="btn btn-primary" onClick={(event) => {

                    event.preventDefault();
                    this.props.restore()

                }}>Återställ</button>
            )
        }

        if (this.props.setGalleryCover) {

            buttons.push(
                <button className="btn btn-primary" onClick={(event) => {

                    event.preventDefault();
                    this.props.setGalleryCover(this.props.full)

                }}>Använd som omslag</button>
            )
        }

        return buttons;

    }

    render() {

        return (

            <div className="gallery-item" {...this.props.extraProps}>

                <img src={this.props.thumb} width={this.props.width} />
                <div className="btn-group-vertical edit-image">
                    {this.createEditingButtons()}
                </div>

            </div>
        )
    }
}

export default EditableImage