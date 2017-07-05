import React from 'react';

class Gig extends React.Component {

    constructor(props) {

        super(props);
        this.buildOptionals();

    }

    buildOptionals() {

        this.optionals = [];

        this.createOptional('span', 'orange-brown', this.props.model.price, 1);
        this.createOptional('span', 'orange-brown', this.props.model.address, 2);
        this.createOptional('a', this.props.model.webpage, this.props.model.webpage, 3);
        this.createOptional('a', this.props.model.ticketLink, this.props.model.ticketLink, 4);

    }

    createOptional(innerElement, prop, data, key) {

        if (typeof(data) === 'undefined') {
            return;
        }

        let propObject = prop === 'a' ? {href: prop} : {className: prop};
        let inner = React.createElement(
            innerElement,
            propObject,
            data
        );

        let element = <p key={key}>{inner}</p>;

        this.optionals.push(element);

    }

    render() {
        return (
            <div className="gig selectable collapsed row" onClick={(event) => this.props.onClick(event.currentTarget)}>
                <div className="col-xs-12">
                    <div className="row">
                        <div className="gig-text col-xs-9">
                            <p className="text-center">{ this.props.model.datetime } - <span className="orange-brown">{ this.props.model.venue_name }</span>, { this.props.model.city }</p>
                        </div>
                        <div className="gig-button col-xs-3"></div>
                    </div>

                    <div className="row">

                        <div className="additional-info col-xs-12">
                            <p>Tid: <span className="orange-brown">{ this.props.model.datetime }</span></p>
                            {this.optionals}
                            <p>{ this.props.model.info }</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Gig;