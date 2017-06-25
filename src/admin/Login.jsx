import React from 'react';
import { Col, FormGroup, FormControl, Button } from 'react-bootstrap';

class Login extends React.Component {

    login() {

        this.props.loginFunction(this.state.username, this.state.password, (response) => {

            localStorage.setItem('username', this.state.username);
            localStorage.setItem('authToken', response.token);

        }, console.error);
    }

    setUsername(username) {
        this.setState({username: username});
    }

    setPassword(password) {
        this.setState({password: password});
    }

    render() {

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