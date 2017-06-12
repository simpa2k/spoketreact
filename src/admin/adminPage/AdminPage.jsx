import React from 'react';
import AdminItem from './AdminItem.jsx';

class AdminPage extends React.Component {

    constructor(props) {

        super(props);

        this.state = {};
        this.fieldsToDisplay = [];

    }

    componentDidMount() {

        this.setPostState();

        /*
         * The order here matters, since createItems
         * relies on fieldsToDisplay being set
         * while creating inputs in createFormGroups.
         */
        this.createFormGroups();
        this.createItems();

    }

    createItems() {

        this.props.getItems((items) => {

            this.setState({items: items.map((item, index) => {

                return (

                    <div key={index} className="admin-item selectable row" onClick={(e) => this.setPutState(e)} >
                        <AdminItem item={item} fields={this.fieldsToDisplay} />
                    </div>

                )
            })});

        }, (error) => {
            console.log(error);
        });
    }

    createFormGroups() {

        this.setState({formGroups: this.props.formStructure.map((group, index) => {

            let id = this.props.entityName + '-' + index;

            return (

                <div key={index} className="form-group">

                    <label htmlFor={id}>{group.label}</label>
                    <div id={id}>
                        {this.createInputs(group.fields)}
                    </div>

                </div>
            )
        })});
    }

    createInputs(group) {

        let inputs = [];
        let index = 0;

        for (const FIELD_NAME in group) {

            if (group.hasOwnProperty(FIELD_NAME)) {

                this.fieldsToDisplay.push(FIELD_NAME);

                inputs.push(
                    this.resolveInputType(FIELD_NAME, group[FIELD_NAME], ++index)
                )
            }
        }
        return inputs;

    }

    resolveInputType(fieldName, type, key) {

        let element;

        switch (type) {

            case 'datetime':
                element = <input key={key} type="datetime-local" className="form-control" name={fieldName} />;
                break;
            case 'textarea':
                element = <textarea key={key} rows="4" cols="50" className="form-control" />;
                break;
            default:
                element = <input key={key} type="text" name={fieldName} className="form-control" />;
                break;
        }
        return element;

    }

    send(e) {

        /*
         * Without preventDefault, the browser will redirect to:
         *
         * http://localhost:8080/admin/gigs?datetime=&ticketlink=&info=&price=&venue_name=
         *
         * That is, a uri with a set of empty gig query parameters, on clicking the button
         * that this event handler is attached to. This is really strange and I haven't
         * figured out why this is happening yet, might have something to do with React's
         * synthetic events (see for example https://medium.com/@ericclemmons/react-event-preventdefault-78c28c950e46).
         * preventDefault fixes it, however.
         */
        e.preventDefault();
        console.log('Sending');


    }

    setPostState() {

        this.setState({
            addingNew: true,
            action: 'Lägg till'
        });
    }

    setPutState(e) {

        this.setState({
            addingNew: false,
            action: 'Bekräfta ändringar'
        });
    }

    deleteItem(e) {

        /*
         * Without preventDefault, the browser will redirect to:
         *
         * http://localhost:8080/admin/gigs?datetime=&ticketlink=&info=&price=&venue_name=
         *
         * That is, a uri with a set of empty gig query parameters, on clicking the button
         * that this event handler is attached to. This is really strange and I haven't
         * figured out why this is happening yet, might have something to do with React's
         * synthetic events (see for example https://medium.com/@ericclemmons/react-event-preventdefault-78c28c950e46).
         * preventDefault fixes it, however.
         */
        e.preventDefault();
        console.log('Deleting');

    }

    render() {

        return (

            <div className="admin-page">

                <div className="box col-sm-4">

                    <p className="text non-bordered-large-section-heading">{this.props.entityName}</p>

                    <div className="selectable-container">{this.state.items}</div>

                </div>

                <div className="col-sm-8">

                    <div className="col-sm-6 col-sm-offset-3">

                        <form name={this.props.formName}>

                            <p className="non-bordered-large-section-heading text-center">{this.props.heading}</p>

                            {this.state.formGroups}

                            <button className="btn btn-primary pull-left" onClick={(e) => { this.send(e); }}>{this.state.action}</button>
                            {this.state.addingNew ? null : <button className="btn btn-primary pull-left" onClick={() => { this.setPostState(); }}>Ny</button>}

                            {this.state.addingNew ? null : <button className="btn btn-danger pull-right" onClick={(e) => { this.deleteItem(e); }}>Ta bort</button>}

                        </form>

                    </div>

                </div>

            </div>

        )
    }
}

export default AdminPage;