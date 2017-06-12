import React from 'react';

class AdminForm extends React.Component {

    constructor(props) {

        super(props);
        this.state = {model: this.props.model};
        this.editableFields = [];

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

        let inputs = [];
        let index = 0;

        for (const FIELD_NAME in group) {

            if (group.hasOwnProperty(FIELD_NAME)) {

                /*
                 * This makes sure that only fields that are supposed to be editable, that is, fields
                 * that there will be an input element for, are displayed in the admin items generated
                 * in AdminPage.createItems. Semantically, this code should probably be placed in that function but that
                 * would require going through the fields once again. The extra time that would take really is
                 * negligible, though.
                 */
                this.editableFields.push(FIELD_NAME);

                inputs.push(
                    this.resolveInputType(FIELD_NAME, group[FIELD_NAME], ++index)
                )
            }
        }
        return inputs;

    }

    resolveInputType(fieldName, type, key) {

        let element;
        let value = this.state.model[fieldName];

        if (typeof(value) === 'undefined' || value === null) {
            value = '';
        }

        let props = {

            key: key,
            className: 'form-control',
            value: value,
            onChange: (event) => {
                this.updateModel(event, fieldName)
            }
        };

        switch (type) {

            case 'datetime':

                element = 'input';

                props.type = 'datetime-local';
                props.name = fieldName;

                break;

            case 'textarea':

                element = 'textarea';

                props.rows = '4';
                props.cols = '50';

                break;

            default:

                element = 'input';

                props.type = 'text';
                props.name = fieldName;

                break;
        }

        if (typeof(type.enabled) !== 'undefined') {
            props.disabled = !type.enabled;
        }

        return React.createElement(
            element,
            props
        );
    }

    updateModel(event, fieldName) {

        let model = this.state.model;
        model[fieldName] = event.target.value;

        this.setState({model: model});

    }

    render() {

        return (
            <div>{this.createFormGroups()}</div>
        )
    }
}

export default AdminForm;