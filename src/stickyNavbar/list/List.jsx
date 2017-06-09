import React from 'react';

class List extends React.Component {

    constructor(props) {
        super(props);
    }

    createElement(element, classes) {
        return element;
    }

    map(classes) {

        return this.props.items.map((element, index) =>
            <li key={index}>{this.createElement(element, classes)}</li>
        );
    }

    render() {

        return (
            <ul>{this.map(this.props.classes)}</ul>
        )
    }
}

export default List;