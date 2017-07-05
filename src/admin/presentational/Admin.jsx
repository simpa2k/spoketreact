import React from 'react';
import {Route, Switch} from 'react-router-dom';

import AdminPage from '../adminPage/AdminPage.jsx';
import SingleItemAdminPage from '../adminPage/SingleItemAdminPage.jsx';
import AdminMembersPage from '../adminPage/AdminMembersPage.jsx';
import StickyNavbar from '../../stickyNavbar/StickyNavbar.jsx';
import Gig from '../../home/presentational/Gig.jsx';
import EditableYoutubePlayer from '../presentational/EditableYoutubePlayer.jsx';
import EditableSoundPlayer from '../presentational/EditableSoundPlayer.jsx';
import Gallery from '../../home/presentational/gallery/Gallery.jsx';

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
            },
            {
                name: 'VIDEOR',
                destination: '/admin/videos'
            },
            {
                name: 'LJUD',
                destination: '/admin/sounds'
            },
            {
                name: 'BILDER',
                destination: '/admin/images'
            }

        ];
    }

    render() {

        return (

            <div>

                <StickyNavbar headings={this.onSiteNavItems}
                              socialMedia={[]}
                              elementToStickToY={0} />

                <Route path="/admin/gigs" render={() => {
                    return <AdminPage getItems={this.state.data.getGigs}
                                      putItem={this.state.data.putGig}
                                      postItem={this.state.data.postGig}
                                      deleteItem={this.state.data.deleteGig}
                                      getFormStructure={this.state.data.getGigsStructure}
                                      formName="gigs-form"
                                      entityName="KONSERTER"
                                      refreshCallback={this.refreshGigs}
                                      createObject={this.createGig}
                                      displayItem={(item, setEditState) => {
                                        return <Gig model={item} onClick={(event) => {setEditState()}} />
                                      }}/>
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

                <Route path="/admin/videos" render={() => {
                    return <AdminPage getItems={this.state.data.getVideos}
                                      putItem={this.state.data.putVideo}
                                      postItem={this.state.data.postVideo}
                                      deleteItem={this.state.data.deleteEmbeddedItem}
                                      getFormStructure={this.state.data.getEmbeddedItemStructure}
                                      formName="video-form"
                                      entityName="VIDEO"
                                      refreshCallback={this.refreshVideos}
                                      createObject={this.createVideo}
                                      displayItem={(item, setEditState) => {
                                          return <EditableYoutubePlayer model={item} onClick={setEditState} />
                                      }}/>
                }} />

                <Route path="/admin/sounds" render={() => {
                    return <AdminPage getItems={this.state.data.getSounds}
                                      putItem={this.state.data.putSound}
                                      postItem={this.state.data.postSound}
                                      deleteItem={this.state.data.deleteEmbeddedItem}
                                      getFormStructure={this.state.data.getSoundStructure}
                                      formName="sound-form"
                                      entityName="LJUD"
                                      refreshCallback={this.refreshSounds}
                                      createObject={this.createSound}
                                      displayItem={(item, setEditState) => {
                                          return <EditableSoundPlayer model={item} onClick={setEditState} />
                                      }}/>
                }} />

                <Route path="/admin/images" render={() => {
                    return <AdminPage getItems={this.state.data.getGalleries}
                                      putItem={this.state.data.putGallery}
                                      postItem={this.state.data.postGallery}
                                      deleteItem={this.state.data.deleteGallery}
                                      getFormStructure={this.state.data.getGalleryStructure}
                                      formName="galleries-form"
                                      entityName="GALLERIER"
                                      refreshCallback={this.refreshImages}
                                      createObject={this.createImage}
                                      displayItem={(item, setEditState) => {
                                          return <Gallery model={item} onClick={setEditState} />
                                      }}/>
                }} />

            </div>
        )
    }
}

export default Admin;