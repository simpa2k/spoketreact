import React from 'react';

import Admin from '../presentational/Admin.jsx';
import Data from '../../data/Data.js';

class AdminContainer extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            data: new Data()
        };

    }

    getNavItems() {

        return [

            {
                path: '/admin/gigs',
                label: 'GIGS'
            },
            {
                path: '/admin/description',
                label: 'DESCRIPTION'
            }

        ];
    }

    getGigsModel() {
        return this.state.data.getGigsModel();
    }

    getDescriptionModel() {
        return this.state.data.getDescriptionModel();
    }

    render() {

        return (

            <Admin navItems={this.getNavItems()}
                   gigsModel={this.getGigsModel()}
                   descriptionModel={this.getDescriptionModel()} />
        )
    }
}

export default AdminContainer;