import React from 'react';

class AdminMembersPage extends React.Component {

    render() {

        return (
            <AdminPage getItems={this.state.data.getMembers}
                       putItem={this.state.data.putMember}
                       postItem={this.state.data.postMember}
                       deleteItem={this.state.data.deleteMember}
                       getFormStructure={this.state.data.getMemberStructure}
                       formName="member-form"
                       entityName="MEDLEMMAR"
                       refreshCallback={this.refreshMembers}
                       createObject={this.createMember} />

        )
    }
}

export default AdminMembersPage;