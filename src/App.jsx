import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home.jsx';
import Test from './presentational/Test.jsx';

class App extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path="/test" component={Test} />
                <Route path="/" component={Home} />
            </Switch>
        );
    }
}

export default App;
