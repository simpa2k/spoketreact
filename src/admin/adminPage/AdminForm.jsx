import React from 'react';
import FormGroupVisitor from "./FormGroupVisitor";

class AdminForm extends React.Component {

    constructor(props) {

        super(props);
        this.state = {model: this.props.model};
        this.editableFields = [];

        this.updateModel = this.updateModel.bind(this);

    }

    getModel() {
        return this.state.model;
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            model: nextProps.model
        });
    }

    createFormGroups() {

        return this.props.formStructure.map((group, index) => {

            let id = this.props.entityName + '-' + index;

            return (

                <div key={index} className="form-group">

                    <label htmlFor={id}>{group.label}</label>
                    <div id={id}>
                        {this.createInputs(group.fields)}
                    </div>

                </div>
            )
        });
    }

    createInputs(group) {

        let visitor = new FormGroupVisitor(this.state.model, this.updateModel);
        return visitor.visit(group);

    }

    updateModel(value, fieldsToUpdate) {

        let model = this.state.model;

        if (typeof(fieldsToUpdate) === 'object') {
            model = fieldsToUpdate;
        } else {
            model[fieldsToUpdate] = value;
        }

        this.setState({model: model});

    }

    render() {

        return (
            <div>{this.createFormGroups()}</div>
        )
    }
}

export default AdminForm;