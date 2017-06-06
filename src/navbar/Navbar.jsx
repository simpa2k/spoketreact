import React from 'react';
import {Link} from 'react-router-dom';

class Navbar extends React.Component {

    constructor(props) {

        super(props);

    }

    createLabel(label) {

        const extension = label.split('.').pop();

        if (extension === 'jpg' || extension === 'png') {
            return <img src={require('../../dist/images/socialmedia/' + label)} />
        }
        return label;

    }

    render() {

        const className = this.props.mode === 'vertical' ? 'vertical' : 'horizontal';

        const items = this.props.items.map((element, index) => {
            return <Link key={index} to={element.path} className={className}>{this.createLabel(element.label)}</Link>
        });

        return (
            <div id={this.props.id} >{items}</div>
        )
    }
}

export default Navbar;