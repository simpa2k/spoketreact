import React from 'react';

class AdminItem extends React.Component {

    createFields() {

        let fields = [];

        for (const KEY in this.props.item) {

            if (this.props.item.hasOwnProperty(KEY) && this.props.fields.indexOf(KEY) !== -1) {
                fields.push(<p>{KEY + ': ' + this.props.item[KEY]}</p>)
            }
        }
        return fields;

    }

    render() {

        return (
            <div>{this.createFields()}</div>
        )
    }
}

export default AdminItem;