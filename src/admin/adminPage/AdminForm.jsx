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

    getEditableFields() {
        return this.editableFields;
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

        let inputs = visitor.visit(group);

        /*
         * This makes sure that only fields that are supposed to be editable, that is, fields
         * that there will be an input element for, are displayed in the admin items generated
         * in AdminPage.createItems. Semantically, this code should probably be placed in that function but that
         * would require going through the fields once again. The extra time that would take really is
         * negligible, though. Also, it results in a lot of duplicates, but since indexOf checks should return
         * true on the first occurrence of a value this shouldn't be a problem. Space complexity really
         * isn't an issue in this case.
         */
        this.editableFields = this.editableFields.concat(visitor.getVisitedFields());

        return inputs;

    }

    updateModel(event, fieldsToUpdate) {

        let model = this.state.model;

        if (typeof(fieldsToUpdate) === 'object') {
            model = fieldsToUpdate;
        } else {
            model[fieldsToUpdate] = event.target.value;
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