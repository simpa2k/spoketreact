import React from 'react';
import TinyMCE from 'tinymce-react';
import secrets from '../../secrets';

class FormGroupVisitor {

    constructor(formContents, onChange) {

        this.formContents = formContents;
        this.onChange = onChange;

        this._visitedFields = [];

    }

    getVisitedFields() {
        return this._visitedFields;
    }

    visit(formGroup) {

        let inputs = [];
        let index = 0;

        for (const FIELD_NAME in formGroup) {

            if (formGroup.hasOwnProperty(FIELD_NAME)) {

                this.currentFieldName = FIELD_NAME;
                this.currentKey = ++index;

                this._visitedFields.push(FIELD_NAME);
                inputs.push(formGroup[FIELD_NAME].accept(this));

            }
        }
        return inputs;

    }

    getValue(fieldName) {

        let value = this.formContents[fieldName];

        if (typeof(value) === 'undefined' || value === null) {
            value = '';
        }

        return value;

    }

    getOnChange(onChange, fieldName) {
        return (event) => {
            onChange(event, fieldName);
        }
    }

    getProps(key, fieldName, onChange) {

        return {

            key: key,
            className: 'form-control',
            value: this.getValue(fieldName),
            onChange: this.getOnChange(onChange, fieldName)
        }
    };

    createElement(element, props) {
        return React.createElement(element, props);
    };

    createTextInput() {

        let props = this.getProps(this.currentKey, this.currentFieldName, this.onChange);

        props.type = 'text';
        props.name = this.currentFieldName;

        return this.createElement('input', props);

    }

    createAutoCompletedTextInput(collection, comparisonFunction) {

        let fieldName = this.currentFieldName;

        let props = this.getProps(this.currentKey, this.currentFieldName, (event) => {

            let autoCompleted = collection.find((item) => {
                return comparisonFunction(item, event.target.value);
            });

            let fieldsToUpdate;

            if (typeof(autoCompleted) !== 'undefined') {
                fieldsToUpdate = Object.assign({}, autoCompleted);
            } else {
                fieldsToUpdate = fieldName
            }

            this.onChange(event, fieldsToUpdate);

        });

        props.type = 'text';
        props.name = this.currentFieldName;

        return this.createElement('input', props);

    }

    createDateTimeInput() {

        let props = this.getProps(this.currentKey, this.currentFieldName, this.onChange);

        props.type = 'datetime-local';
        props.name = this.currentFieldName;

        return this.createElement('input', props);

    }

    createTextarea() {

        return (

            <TinyMCE apiKey={secrets.tinyMCEAPIKey}
                     content={this.getValue(this.currentFieldName)}
                     onChange={this.getOnChange(this.onChange, this.currentFieldName)} />
        )
    }
}

export default FormGroupVisitor;