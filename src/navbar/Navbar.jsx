import React from 'react';
import {Link} from 'react-router-dom';

class Navbar extends React.Component {

    constructor(props) {
        super(props);
    }

    createNavItems(navItems) {

        return navItems.map((item) => {

            return <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
            </li>
        });
    }

    render() {

        return (

            <ul>{this.createNavItems(this.props.navItems)}</ul>

        )
    }
}

export default Navbar;