import React from 'react';

class Section extends React.Component {

    render() {

        return (

            <div>
                <h1>{this.props.heading}</h1>
                {this.props.children}
            </div>
        )
    }
}

export default Section;