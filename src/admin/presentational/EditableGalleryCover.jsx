import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import EditableImage from "./EditableImage.jsx";

class EditableGalleryCover extends React.Component {

    constructor(props) {

        super(props);
        this.state = {};

    }

    componentDidMount() {
        this.setState({showModal: false});
    }

    openModal() {
        this.setState({showModal: true});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    createImages() {

        return this.props.images.map((image, index) => {
            return <EditableImage full={image.full} thumb={'/' + image.thumb} setGalleryCover={() => {

                this.props.setGalleryCover(image.full);
                this.closeModal();

            }}/>
        });
    }

    render() {

        return (

            <div className="row col-xs-12">
                <img src={this.props.src} style={{width: '100%'}} />
                <Button bsStyle="primary" onClick={() => this.openModal()}>Välj galleriomslag</Button>

                <Modal show={this.state.showModal} onHide={() => this.closeModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Välj galleriomslag</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Bilder i galleriet</h4>
                        {this.createImages()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.closeModal()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default EditableGalleryCover