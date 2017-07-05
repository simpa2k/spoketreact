import React from 'react';

class AdminItem extends React.Component {

    createFields() {

        let fields = [];

        for (const KEY in this.props.model) {

            if (this.props.model.hasOwnProperty(KEY) && this.props.fields.indexOf(KEY) !== -1) {
                fields.push(<p key={KEY}>{KEY + ': ' + this.props.model[KEY]}</p>)
            }
        }
        return fields;

    }

    render() {

        return (
            <div className="admin-item selectable row" onClick={this.props.onClick}>{this.createFields()}</div>
        )
    }
}

export default AdminItem;