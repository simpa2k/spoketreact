import React from 'react';

class AdminPage extends React.Component {

    createInputs(model) {

        let inputs = [];

        for (const key in model) {

            if (model.hasOwnProperty(key)) {
                inputs.push(<input type={model[key]} placeholder={key} key={key} />);
            }
        }

        return inputs;

    }

    render() {

        return (

            <div>
                <h1>This is an admin page!</h1>
                <form>{this.createInputs(this.props.model)}</form>
            </div>
        )
    }
}

export default AdminPage;