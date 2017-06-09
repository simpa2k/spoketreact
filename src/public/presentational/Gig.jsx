import React from 'react';

class Gig extends React.Component {

    render() {

        return (

            <div>
                <p>{this.props.data.ticketlink}</p>
                <p>{this.props.data.info}</p>
                <p>{this.props.data.price}</p>
                <p>{this.props.data.datetime}</p>
                <p>{this.props.data.venueName}</p>
            </div>
        )
    }
}

export default Gig;