import React from 'react';
import {Route, Switch} from 'react-router-dom';

import AdminPage from '../adminPage/AdminPage.jsx';
import SingleItemAdminPage from '../adminPage/SingleItemAdminPage.jsx';
import StickyNavbar from '../../stickyNavbar/StickyNavbar.jsx';

class Admin extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            data: this.props.data
        };

        this.findLinks();

    }

    findLinks() {

        this.onSiteNavItems =  [

            {
                name: 'KONSERTER',
                destination: '/admin/gigs'
            },
            {
                name: 'BESKRIVNING',
                destination: '/admin/description'
            },
            {
                name: 'MEDLEMMAR',
                destination: '/admin/members'
            }

        ];
    }

    render() {

        return (

            <div>

                <StickyNavbar headings={this.onSiteNavItems}
                              socialMedia={[]}
                              elementToStickToY={0} />

                <Switch>

                    <Route path="/admin/gigs" render={() => {
                        return <AdminPage getItems={this.state.data.getGigs}
                                          putItem={this.state.data.putGig}
                                          postItem={this.state.data.postGig}
                                          deleteItem={this.state.data.deleteGig}
                                          getFormStructure={this.state.data.getGigsStructure}
                                          formName="gigs-form"
                                          entityName="KONSERTER"
                                          refreshCallback={this.refreshGigs}
                                          createObject={this.createGig} />
                    }} />

                    <Route path="/admin/description" render={() => {
                        return <SingleItemAdminPage  getItems={this.state.data.getDescription}
                                                     putItem={this.state.data.putDescription}
                                                     getFormStructure={this.state.data.getDescriptionStructure}
                                                     formName="description-form"
                                                     entityName="BESKRIVNING"
                                                     refreshCallback={this.refreshDescription}
                                                     createObject={this.createDescription} />
                    }} />

                    <Route path="/admin/members" render={() => {
                        return <AdminPage getItems={this.state.data.getMembers}
                                          putItem={this.state.data.putMember}
                                          postItem={this.state.data.postMember}
                                          deleteItem={this.state.data.deleteMember}
                                          getFormStructure={this.state.data.getMemberStructure}
                                          formName="member-form"
                                          entityName="MEDLEMMAR"
                                          refreshCallback={this.refreshMembers}
                                          createObject={this.createMember} />
                    }} />

                </Switch>

            </div>
        )
    }
}

export default Admin;