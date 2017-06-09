import React from 'react';

class Member extends React.Component {

    render() {

        return (
            <div className="member">
                <p>{this.props.data.firstname} {this.props.data.lastname} - {this.props.data.instrument}</p>
            </div>
        )
    }
}

export default Member;