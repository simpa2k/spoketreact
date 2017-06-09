import React from 'react';

class Section extends React.Component {

    render() {

        return (

            <div className="section">
                <h1 className="section-heading">{this.props.heading}</h1>
                {this.props.children}
            </div>
        )
    }
}

export default Section;