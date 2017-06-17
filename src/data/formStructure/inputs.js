let text = {

    accept: (visitor) => {
        return visitor.createTextInput();
    }
};

let AutocompletedText = function(collection, comparisonFunction, assignmentFunction) {

    this.collection = collection;
    this.accept = (visitor) => {
        return visitor.createAutoCompletedTextInput(this.collection, comparisonFunction, assignmentFunction);
    };
};

let datetime = {

    accept: (visitor) => {
        return visitor.createDateTimeInput();
    }
};

let textarea = {

    accept: (visitor) => {
        return visitor.createTextarea();
    }
};

let image = {

    accept: (visitor) => {
        return visitor.createImage();
    }
};

let imageCollection = {

    accept: (visitor) => {
        return visitor.createImageCollection(visitor.createExistingEditableImageAsArrayItem);
    }
};

let temporaryImageCollection = {

    accept: (visitor) => {
        return visitor.createImageCollection(visitor.createTemporaryEditableImageAsArrayItem);
    }
};

let deletedImageCollection = {

    accept: (visitor) => {
        return visitor.createImageCollection(visitor.createRemovedEditableImageAsArrayItem);
    }
};

let imageUpload = {

    accept: (visitor) => {
        return visitor.createImageUpload();
    }
};


export { text, AutocompletedText, datetime, textarea, image, imageCollection, temporaryImageCollection, deletedImageCollection, imageUpload };

