let text = {

    accept: (visitor) => {
        return visitor.createTextInput();
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

export { text, datetime, textarea };

