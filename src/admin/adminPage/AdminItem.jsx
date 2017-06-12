import React from 'react';

class AdminItem extends React.Component {

    createFields() {

        let fields = [];

        for (const KEY in this.props.item) {

            //if (this.props.item.hasOwnProperty(KEY) && this.props.fields.indexOf(KEY) !== -1) {
            if (this.props.item.hasOwnProperty(KEY)) {
                fields.push(<p key={KEY}>{KEY + ': ' + this.props.item[KEY]}</p>)
            }
        }
        return fields;

    }

    render() {

        return (
            <div onClick={this.props.onClick}>{this.createFields()}</div>
        )
    }
}

export default AdminItem;