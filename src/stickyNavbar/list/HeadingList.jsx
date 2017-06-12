import React from 'react';
import List from './List.jsx';
import {Link} from 'react-router-dom';

class HeadingList extends List {

    constructor(props) {
        super(props);
    }

    createParagraph(element, classes) {
        return <p className={classes} onClick={() => window.scrollTo(0, element.destination)}>{element.name}</p>;
    }

    createAnchor(element, classes) {
        //return <a className={classes} href={element.destination}>{element.name}</a>;
        return <Link className={classes} to={element.destination}>{element.name}</Link>;
    }

    createElement(element, classes) {

        if (isNaN(element.destination)) {
            return this.createAnchor(element, classes);
        }

        return this.createParagraph(element, classes);

    }
}

export default HeadingList;