import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminContainer from './admin/containers/AdminContainer.jsx';
import Login from './admin/Login.jsx';
import Home from './home/Home.jsx';

import Data from './data/Data.js';

class App extends React.Component {

    render() {

        const data = new Data();

        return (
            <Switch>

                <Route path="/admin" render={() => {
                    return <AdminContainer data={data} />
                }} />

                <Route path="/login" render={() => {
                    return <Login loginFunction={data.getUser} />
                }} />

                <Route path="/" render={() => {
                    return <Home data={data} />
                }} />

            </Switch>
        );
    }
}

export default App;
