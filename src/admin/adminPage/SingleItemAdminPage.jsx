import React from 'react';
import AdminPage from './AdminPage.jsx';
import AdminForm from "./AdminForm.jsx";

class SingleItemAdminPage extends AdminPage {

    componentDidMount() {

        this.props.getFormStructure((formStructure) => {

            this.setState({formStructure: formStructure});
            this.props.getItems((item) => {
                this.setPutState(item);
            })
        });
    }

    render() {

        return (

            <div className="admin-page">

                <p className="non-bordered-large-section-heading text-center">{'REDIGERA ' + this.props.entityName}</p>

                <div className="col-sm-6 col-sm-offset-3">

                    <AdminForm formStructure={this.state.formStructure}
                               model={this.state.itemToSend}
                               entityName={this.props.entityName}
                               ref={(adminForm) => {this.adminForm = adminForm; }} />

                    <button className="btn btn-primary pull-left" onClick={(e) => { this.state.send(e); }}>{this.state.action}</button>
                    {this.createNewButton()}

                    {this.createDeleteButton()}

                </div>

            </div>
        )
    }
}

export default SingleItemAdminPage;