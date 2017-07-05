import React from 'react';
import { Redirect } from 'react-router-dom';
import { Col, FormGroup, FormControl, Button } from 'react-bootstrap';

class Login extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            redirect: false
        }
    }

    login() {

        this.props.loginFunction(this.state.username, this.state.password, (response) => {

            localStorage.setItem('username', this.state.username);
            localStorage.setItem('authToken', response.token);

            this.setState({redirect: true});

        }, console.error);
    }

    setUsername(username) {
        this.setState({username: username});
    }

    setPassword(password) {
        this.setState({password: password});
    }

    render() {

        let redirect = this.state.redirect;

        if (redirect) {
            return <Redirect to="/admin" />
        }

        return (

            <Col xs={6} xsOffset={3}>
                <FormGroup>
                    <FormControl type="text" placeholder="Användarnamn" onChange={(event) => this.setUsername(event.target.value)} />
                    <FormControl type="password" placeholder="Lösenord" onChange={(event) => this.setPassword(event.target.value)} />

                    <Button bsStyle="primary" onClick={() => this.login()}>Logga in</Button>
                </FormGroup>
            </Col>
        )
    }
}

export default Login;