import React from 'react';
import AdminItem from './AdminItem.jsx';
import AdminForm from "./AdminForm.jsx";

class AdminPage extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            itemToSend: {},
            formStructure: []
        };
        this.fieldsToDisplay = [];

    }

    componentDidMount() {

        if (typeof(this.props.postItem) !== 'undefined') {
            this.setPostState();
        } else {
            this.setPutState({});
        }

        this.props.getFormStructure((formStructure) => {

            this.setState({formStructure: formStructure});
            this.createItems(this.adminForm.getEditableFields());

        });
    }

    createItems(fieldsToDisplay) {

        this.props.getItems((items) => {

            this.setState({
                items: items.map((item, index) => {

                    return (

                        <div key={index} className="admin-item selectable row">
                            <AdminItem item={item} fields={fieldsToDisplay} onClick={() => this.setPutState(item)}/>
                        </div>

                    )
                })
            });

        }, (error) => {
            console.log(error);
        });
    }

    postItem(e) {

        /*
         * Without preventDefault, the browser will redirect to:
         *
         * http://localhost:8080/admin/gigs?datetime=&ticketlink=&info=&price=&venue_name=
         *
         * That is, a uri with a set of empty gig query parameters, on clicking the button
         * that this event handler is attached to. This is really strange and I haven't
         * figured out why this is happening yet, might have something to do with React's
         * synthetic events (see for example https://medium.com/@ericclemmons/react-event-preventdefault-78c28c950e46).
         * preventDefault fixes it, however, so going with that for now.
         */
        e.preventDefault();
        this.props.postItem(this.adminForm.getModel(), null, null);

    }

    putItem(e) {

        /*
         * Without preventDefault, the browser will redirect to:
         *
         * http://localhost:8080/admin/gigs?datetime=&ticketlink=&info=&price=&venue_name=
         *
         * That is, a uri with a set of empty gig query parameters, on clicking the button
         * that this event handler is attached to. This is really strange and I haven't
         * figured out why this is happening yet, might have something to do with React's
         * synthetic events (see for example https://medium.com/@ericclemmons/react-event-preventdefault-78c28c950e46).
         * preventDefault fixes it, however, so going with that for now.
         */
        e.preventDefault();
        this.props.putItem(this.adminForm.getModel(), null, null);

    }

    setPostState() {

        this.setState({
            addingNew: true,
            action: 'Lägg till',
            itemToSend: {},
            send: (e) => {
                this.postItem(e);
            }
        });
    }

    setPutState(item) {

        this.setState({
            addingNew: false,
            action: 'Bekräfta ändringar',
            itemToSend: item,
            send: (e) => {
                this.putItem(e);
            }
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
         * preventDefault fixes it, however, so going with that for now.
         */
        e.preventDefault();
        this.props.deleteItem(this.adminForm.getModel(), null, null);

    }

    createDeleteButton() {

        if (this.state.addingNew || (typeof(this.props.deleteItem) === 'undefined')) {
            return null;
        }

        return <button className="btn btn-danger pull-right" onClick={(e) => {
            this.deleteItem(e);
        }}>Ta bort</button>
    }

    createNewButton() {

        if (this.state.addingNew || (typeof(this.props.postItem) === 'undefined')) {
            return null;
        }

        return <button className="btn btn-primary pull-left" onClick={() => {
            this.setPostState();
        }}>Ny</button>
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

                            <AdminForm formStructure={this.state.formStructure}
                                       model={this.state.itemToSend}
                                       entityName={this.props.entityName}
                                       ref={(adminForm) => {this.adminForm = adminForm; }} />

                            <button className="btn btn-primary pull-left" onClick={(e) => { this.state.send(e); }}>{this.state.action}</button>
                            {this.createNewButton()}

                            {this.createDeleteButton()}

                        </form>

                    </div>

                </div>

            </div>

        )
    }
}

export default AdminPage;