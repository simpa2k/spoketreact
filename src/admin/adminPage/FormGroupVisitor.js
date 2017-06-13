import React from 'react';

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

    getProps(key, fieldName, onChange) {

        let value = this.formContents[fieldName];

        if (typeof(value) === 'undefined' || value === null) {
            value = '';
        }

        return {

            key: key,
            className: 'form-control',
            value: value,
            onChange: (event) => {
                onChange(event, fieldName)
            }
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

        let props = this.getProps(this.currentKey, this.currentFieldName, this.onChange);

        props.rows = '4';
        props.cols = '50';

        return this.createElement('textarea', props);

    }
}

export default FormGroupVisitor;