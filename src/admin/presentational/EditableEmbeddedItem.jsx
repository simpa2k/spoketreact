import React from 'react';

class EditableEmbeddedItem extends React.Component {

    getStyle() {
        return {
            marginBottom: '1%'
        }
    }

    getEmbeddedItem() {
        throw new TypeError('getEmbeddedItem() must be implemented.');
    }

    render() {

        return (

            <div className="row col-xs-12" style={this.getStyle()}>

                <div className="row col-xs-12">
                    {this.getEmbeddedItem()}
                </div>

                <div className="row col-xs-12">
                    <button className="btn btn-primary" onClick={this.props.onClick}>Redigera</button>
                </div>

            </div>

        )
    }
}

export default EditableEmbeddedItem