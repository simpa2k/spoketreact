import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminContainer from './admin/containers/AdminContainer.jsx';
import Login from './admin/Login.jsx';
import Home from './home/Home.jsx';

class App extends React.Component {

    render() {
        return (
            <Switch>
                <Route path="/admin" component={AdminContainer} />
                <Route path="/login" component={Login} />
                <Route path="/" component={Home} />
            </Switch>
        );
    }
}

export default App;
