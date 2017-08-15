import React from 'react';
import TinyMCE from 'tinymce-react';
import EditableImage from "../presentational/EditableImage.jsx";
import EditableGalleryCover from "../presentational/EditableGalleryCover.jsx";
import FileUpload from "../presentational/FileUpload.jsx";

import { DateField } from 'react-date-picker';
import 'react-date-picker/index.css'

import secrets from '../../../secrets';

class FormGroupVisitor {

    constructor(formContents, onChange) {

        this.formContents = formContents;
        this.onChange = onChange;

        this.createExistingEditableImageAsArrayItem = this.createExistingEditableImageAsArrayItem.bind(this);
        this.createTemporaryEditableImageAsArrayItem = this.createTemporaryEditableImageAsArrayItem.bind(this);
        this.createRemovedEditableImageAsArrayItem = this.createRemovedEditableImageAsArrayItem.bind(this);

    }

    visit(formGroup) {

        let inputs = [];
        let index = 0;

        for (const FIELD_NAME in formGroup) {

            if (formGroup.hasOwnProperty(FIELD_NAME)) {

                this.currentFieldName = FIELD_NAME;
                this.currentKey = ++index;

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
            onChange(event.target.value, fieldName);
        }
    }

    getProps(key, fieldName, onChange) {

        return {

            key: key,
            className: 'form-control',
            value: this.getValue(fieldName),
            placeholder: fieldName,
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

        let props = this.getProps(this.currentKey, this.currentFieldName, (targetValue) => {

            let autoCompleted = collection.find((item) => {
                return comparisonFunction(item, targetValue);
            });

            let fieldsToUpdate;

            if (typeof(autoCompleted) !== 'undefined') {
                fieldsToUpdate = Object.assign({}, autoCompleted);
            } else {
                fieldsToUpdate = fieldName
            }

            this.onChange(targetValue, fieldsToUpdate);

        });

        props.type = 'text';
        props.name = this.currentFieldName;

        return this.createElement('input', props);

    }

    createDateTimeInput() {

        return (

            <DateField dateFormat={'YYYY-MM-DD HH:mm:ss'} value={this.getValue(this.currentFieldName)} onChange={(datestring) => {
                this.onChange(datestring, this.currentFieldName);
            }} />
        )
    }

    createTextarea() {

        return (

            <TinyMCE apiKey={secrets.tinyMCEAPIKey}
                     content={this.getValue(this.currentFieldName)}
                     onContentChanged={(content) => this.onChange(content, this.currentFieldName)} />
        )
    }

    createImage() {

        let imagePath = this.formContents[this.currentFieldName];

        if (typeof(imagePath) !== 'undefined') {
            /*return <div className="row col-xs-12">
                <img src={'/' + this.getValue(this.currentFieldName)} style={{width: '100%'}} />
            </div>*/
            return <EditableGalleryCover src={'/' + this.getValue(this.currentFieldName)}
                                         images={this.formContents['images']}
                                         setGalleryCover={(imagePath) => this.onChange(imagePath, 'galleryCover')} />;
        }
        return <p className="large-text">Ingen bild vald</p>

    }

    createEditableImage(pathToFull, pathToThumb, deleteFunction, restoreFunction, setGalleryCoverFunction, additionalProps, width) {
        return <EditableImage full={pathToFull} thumb={pathToThumb}
                              delete={deleteFunction} restore={restoreFunction} setGalleryCover={setGalleryCoverFunction}
                              width={width}
                              extraProps={additionalProps} />
    }

    moveToAnotherArray(image, index, sourceArray, destinationKey) {

        // ToDo: Make sure that the gallery cover is removed if the image removed is used as gallery cover.
        let destinationArray = this.formContents[destinationKey];

        if (typeof(destinationArray) === 'undefined') {
            destinationArray = [];
        }
        destinationArray.push(image);
        sourceArray.splice(index, 1);

        this.onChange(destinationArray, destinationKey);

    }

    createExistingEditableImageAsArrayItem(image, index, images, additionalProps) {

        return this.createEditableImage(image.full, '/' + image.thumb, () => {
            this.moveToAnotherArray(image, index, images, 'deleted');
        }, null, null, additionalProps);
    }

    createTemporaryEditableImageAsArrayItem(base64Image, index, images, additionalProps) {

        let fieldName = this.currentFieldName;

        return this.createEditableImage(base64Image, base64Image, () => {

            images.splice(index, 1);
            this.onChange(images, fieldName);

        }, null, null, additionalProps, '256');
    }


    createRemovedEditableImageAsArrayItem(image, index, images, additionalProps) {

        return this.createEditableImage(image.full, '/' + image.thumb, null, () => {
            this.moveToAnotherArray(image, index, images, 'images');
        }, null, additionalProps)
    }

    createImageCollection(createImageFunction) {

        let images = this.formContents[this.currentFieldName];

        if (typeof(images) === 'undefined' || images.length === 0) {
            return <p className="large-text">Inga bilder att visa</p>
        }

        return images.map((image, index) => {
            return createImageFunction(image, index, images, {key: index});
        });
    }

    createImageUpload() {

        return <FileUpload label={'Ladda upp'} handleFile={(image) => {

            let addedImages = this.formContents['addedImages'];

            if (typeof(addedImages) === 'undefined') {
                addedImages = [];
            }
            addedImages.push(image);

            this.onChange(addedImages, 'addedImages');

        }} />
    }
}

export default FormGroupVisitor;