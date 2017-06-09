import React from 'react';
import {Route, Switch} from 'react-router-dom';

import AdminPage from './AdminPage.jsx';
import Navbar from '../../navbar/Navbar.jsx';

class Admin extends React.Component {

    render() {

        return (

            <div>

                <Navbar navItems={this.props.navItems} />
                <h1>This is the admin page.</h1>

                <Switch>
                    <Route path="/admin/gigs" render={() => {
                        return <AdminPage model={this.props.gigsModel}/>
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