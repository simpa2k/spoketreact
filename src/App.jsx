import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminContainer from './admin/containers/AdminContainer.jsx';
import Login from './admin/Login.jsx';
import Home from './home/Home.jsx';

import Data from './data/Data.js';
import Endpoint from './data/endpoint/Endpoint';

class App extends React.Component {

    render() {

        const endpoints = {

            contactPersonsEndpoint: new Endpoint('contactpersons', true, true, true),
            descriptionEndpoint: new Endpoint('description', true, false, false),
            embeddedItemsEndpoint: new Endpoint('embeddeditems', true, true, true),
            gigsEndpoint: new Endpoint('gigs', true, true, true),
            imagesEndpoint: new Endpoint('images', true, true, true),
            membersEndpoint: new Endpoint('members', true, true, true),
            usersEndpoint: new Endpoint('users', false, false, false),
            venuesEndpoint: new Endpoint('venues', true, true, false)

        };

        const data = new Data(endpoints);

        return (
            <Switch>
                <Route path="/admin" component={AdminContainer} />
                <Route path="/login" component={Login} />
                <Route path="/" render={() => {
                    return <Home data={data} />
                }} />
            </Switch>
        );
    }
}

export default App;
