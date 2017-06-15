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
            this.createItems(formStructure);

        });
    }

    /*
     * It's a bit inefficient to go through the form structure
     * once again here when it's already being done in AdminForm.
     * However, since AdminForm creates the form structure on
     * setState (that is, asynchronously) any solution that
     * tries to get the displayed fields from AdminForm
     * may run into the problem of the form not being created yet.
     * This is the easiest solution, elegantly avoids duplicate fields
     * and the extra time taken is negligible.
     */
    pickOutFieldsToDisplay(formStructure) {

        // From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=example
        let flatten = arr => arr.reduce(
            (acc, val) => acc.concat(
                Array.isArray(val) ? flatten(val) : val
            ), []);

        return flatten(formStructure.map((formGroup) => {

            let fields = [];

            for (const KEY in formGroup.fields) {

                if (formGroup.fields.hasOwnProperty(KEY)) {
                    fields.push(KEY);
                }
            }

            return fields;

        }));
    }

    createItems(formStructure) {

        this.props.getItems((items) => {

            this.setState({
                items: items.map((item, index) => {

                    let setEditState = () => {
                        this.setPutState(item);
                    };

                    let component = this.props.displayItem ? this.props.displayItem(item, setEditState) : <AdminItem model={item} fields={this.pickOutFieldsToDisplay(formStructure)} onClick={setEditState} />;

                    return (

                        <div key={index} className="selectable-container" >
                            {component}
                        </div>

                    )
                })
            });
            //<div key={index} className="admin-item selectable row">
                //<AdminItem model={item} fields={fieldsToDisplay} onClick={() => this.setPutState(item)}/>
            //</div>

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