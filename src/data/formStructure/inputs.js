let text = {

    accept: (visitor) => {
        return visitor.createTextInput();
    }
};

let AutocompletedText = function(collection, comparisonFunction, assignmentFunction) {

    this.collection = collection;
    this.accept = (visitor) => {
        return visitor.createAutoCompletedTextInput(this.collection, comparisonFunction, assignmentFunction);
    }
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

let imageCollection = {

    accept: (visitor) => {
        return visitor.createImageCollection();
    }
};


export { text, AutocompletedText, datetime, textarea, imageCollection };

