import React from 'react';
import Textbox from '../presentational/Textbox.jsx';

class TextboxContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    createTextboxes() {

        return this.props.textItems.map((element, index) => {
            return <Textbox key={index} content={element} />
        });
    }

    render() {

        return (
            <div className="textbox-container">{this.createTextboxes()}</div>
        )
    }
}

export default TextboxContainer;