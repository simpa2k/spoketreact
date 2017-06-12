import React from 'react';
import AdminItem from './AdminItem.jsx';

class AdminPage extends React.Component {

    constructor(props) {

        super(props);

        this.state = {};
        this.fieldsToDisplay = [];

    }

    componentDidMount() {

        this.createFormGroups();
        this.createItems();

    }

    createItems() {

        this.props.getItems((items) => {

            this.setState({items: items.map((item, index) => {

                return (

                    <div key={index} className="admin-item selectable row">
                        <AdminItem item={item} fields={this.fieldsToDisplay} onClick={this.setPutState()} />
                    </div>

                )
            })});

        }, (error) => {
            console.log(error);
        });
    }

    createFormGroups() {

        this.setState({formGroups: this.props.formStructure.map((group, index) => {

            let id = this.props.entityName + '-' + index;

            return (

                <div id={index} className="form-group">

                    <label htmlFor={id}>{group.label}</label>
                    <div id={id}>
                        {this.createInputs(group.fields)}
                    </div>

                </div>
            )
        })});
    }

    createInputs(group) {

        let inputs = [];

        for (const FIELD_NAME in group) {

            if (group.hasOwnProperty(FIELD_NAME)) {

                this.fieldsToDisplay.push(FIELD_NAME);

                inputs.push(
                    this.resolveInputType(FIELD_NAME, group[FIELD_NAME])
                )
            }
        }
        return inputs;

    }

    resolveInputType(fieldName, type) {

        let element;

        switch (type) {

            case 'datetime':
                element = <input type="datetime-local" name={fieldName} />;
                break;
            case 'textarea':
                element = <textarea rows="4" cols="50" />;
                break;
            default:
                element = <input type="text" name={fieldName} />;
                break;
        }
        return element;

    }

    send() {

    }

    setPostState() {

    }

    setPutState() {

    }

    deleteItem() {

    }

    render() {

        return (

            <div className="admin-page">

                <div className="box col-sm-4">

                    <p className="text non-bordered-large-section-heading">{this.props.entityName}</p>

                    <div className="selectable-container">{this.state.items}</div>

                </div>

                <div className="col-sm-8">

                    <div className="col-sm-6 col-sm-offset-3">

                        <form name={this.props.formName}>

                            <p className="non-bordered-large-section-heading text-center">{this.props.heading}</p>

                            {this.state.formGroups}

                            <button className="btn btn-primary pull-left" onClick={this.send(this.props.formName)}>{this.action}</button>
                            <button className="btn btn-primary pull-left" onClick={this.setPostState()}>Ny</button>

                            <button className="btn btn-primary pull-right" onClick={this.deleteItem(this.props.formName)}>Ta bort</button>

                        </form>

                    </div>

                </div>

            </div>

        )
    }
}

export default AdminPage;