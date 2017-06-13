import React from 'react';
import {Route, Switch} from 'react-router-dom';

import AdminPage from '../adminPage/AdminPage.jsx';
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

                </Switch>

            </div>
        )
            /*<Route path="/admin/description" render={() => {
            return <AdminPage model={this.props.descriptionModel} />
        }} />*/
    }
}

export default Admin;