import React from 'react';
import {Route, Switch} from 'react-router-dom';

import AdminPage from '../adminPage/AdminPage.jsx';
import Navbar from '../../navbar/Navbar.jsx';

class Admin extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            data: this.props.data
        };
    }

    render() {

        return (

            <div>

                <Navbar navItems={this.props.navItems} />
                <h1>This is the admin page.</h1>

                <Switch>
                    <Route path="/admin/gigs" render={() => {
                        return <AdminPage getItems={this.state.data.getGigs}
                                          formStructure={this.state.data.getGigsStructure()}
                                          formName="gigs-form"
                                          entityName="KONSERTER"
                                          refreshCallback={this.refreshGigs}
                                          createObject={this.createGig} />
                    }} />

                    <Route path="/admin/description" render={() => {
                        return <AdminPage model={this.props.descriptionModel} />
                    }} />
                </Switch>

            </div>
        )
    }
}

export default Admin;