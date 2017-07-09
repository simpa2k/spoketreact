import {

    text,
    AutocompletedText,
    datetime,
    textarea,
    image,
    imageCollection,
    temporaryImageCollection,
    deletedImageCollection,
    imageUpload

} from './formStructure/inputs';

import GigsService from './services/GigsService';
import ContactPersonsService from "./services/ContactPersonsService";
import DescriptionService from "./services/DescriptionService";
import EmbeddedItemsService from "./services/EmbeddedItemsService";

class Data {

    constructor(endpoints) {

        this.contactPersonsEndpoint = endpoints.contactPersonsEndpoint;
        this.descriptionEndpoint = endpoints.descriptionEndpoint;
        this.embeddedItemsEndpoint = endpoints.embeddedItemsEndpoint;
        this.gigsEndpoint = endpoints.gigsEndpoint;
        this.imagesEndpoint = endpoints.imagesEndpoint;
        this.galleriesEndpoint = endpoints.galleriesEndpoint;
        this.membersEndpoint = endpoints.membersEndpoint;
        this.usersEndpoint = endpoints.usersEndpoint;
        this.venuesEndpoint = endpoints.venuesEndpoint;

        this.contactPersonsService = new ContactPersonsService();
        this.descriptionService = new DescriptionService();
        this.embeddedItemsService = new EmbeddedItemsService();
        this.gigsService = new GigsService();

        this.bindContactPersonsFunctions();
        this.bindDescriptionFunctions();
        this.bindEmbeddedItemFunctions();
        this.bindGigFunctions();
        this.bindImagesFunctions();
        this.bindMemberFunctions();
        this.bindUserFunctions();

    }

    bindContactPersonsFunctions() {

        this.getContactInfo = this.getContactInfo.bind(this);
        this.putContactPerson = this.putContactPerson.bind(this);
        this.postContactPerson = this.postContactPerson.bind(this);
        this.deleteContactPerson = this.deleteContactPerson.bind(this);

    }

    bindDescriptionFunctions() {

        this.getDescription = this.getDescription.bind(this);
        this.putDescription = this.putDescription.bind(this);
        this.getDescriptionStructure = this.getDescriptionStructure.bind(this);

    }

    bindEmbeddedItemFunctions() {
        
        this.getEmbeddedItems = this.getEmbeddedItems.bind(this);
        this.getVideos = this.getVideos.bind(this);
        this.getSounds = this.getSounds.bind(this);
        this.putEmbeddedItem = this.putEmbeddedItem.bind(this);
        this.putVideo = this.putVideo.bind(this);
        this.postEmbeddedItem = this.postEmbeddedItem.bind(this);
        this.postVideo = this.postVideo.bind(this);
        this.deleteEmbeddedItem = this.deleteEmbeddedItem.bind(this);
        this.getEmbeddedItemStructure = this.getEmbeddedItemStructure.bind(this);
        this.getSoundStructure = this.getSoundStructure.bind(this);

    }

    bindGigFunctions() {

        this.getGigs = this.getGigs.bind(this);
        this.putGig = this.putGig.bind(this);
        this.postGig = this.postGig.bind(this);
        this.deleteGig = this.deleteGig.bind(this);
        this.getGigsStructure = this.getGigsStructure.bind(this);

    }

    bindImagesFunctions() {
        
        this.getGalleries = this.getGalleries.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.getGalleryStructure = this.getGalleryStructure.bind(this);
        
    }

    bindMemberFunctions() {

        this.getMembers = this.getMembers.bind(this);
        this.putMember = this.putMember.bind(this);
        this.postMember = this.postMember.bind(this);
        this.deleteMember = this.deleteMember.bind(this);
        this.getMemberStructure = this.getMemberStructure.bind(this);

    }

    bindUserFunctions() {
        this.getUser = this.getUser.bind(this);
    }

    /*
     * Contact persons
     */

    getContactInfo(successCallback, errorCallback) {
        this.contactPersonsService.getRequest(successCallback, errorCallback);
    }

    putContactPerson(contactPerson, successCallback, errorCallback) {
        this.contactPersonsService.putRequest(contactPerson, successCallback, errorCallback);
    }

    postContactPerson(contactPerson, successCallback, errorCallback) {
        this.contactPersonsService.postRequest(contactPerson, successCallback, errorCallback);
    }

    deleteContactPerson(contactPerson, successCallback, errorCallback) {
        this.contactPersonsService.deleteRequest(contactPerson, successCallback, errorCallback);
    }

    /*
     * Description
     */

    getDescription(successCallback, errorCallback) {
        this.descriptionService.getDescription(successCallback, errorCallback);
    }

    putDescription(description, successCallback, errorCallback) {
        this.descriptionService.putDescription(description, successCallback, errorCallback);
    }

    getDescriptionStructure(callback) {
        this.descriptionService.getDescriptionStructure(callback);
    }

    /*
     * Embedded items
     */

    getEmbeddedItems(successCallback, errorCallback) {
        this.embeddedItemsService.getEmbeddedItems(successCallback, errorCallback);
    }

    getVideos(successCallback, errorCallback) {
        this.embeddedItemsService.getVideos(successCallback, errorCallback);
    }

    getSounds(successCallback, errorCallback) {
        this.embeddedItemsService.getSounds(successCallback, errorCallback);
    }

    putEmbeddedItem(embeddedItem, successCallback, errorCallback) {
        this.embeddedItemsService.putEmbeddedItem(embeddedItem, successCallback, errorCallback);
    }

    putVideo(video, successCallback, errorCallback) {
        this.embeddedItemsService.putVideo(video, successCallback, errorCallback);
    }

    postEmbeddedItem(embeddedItem, successCallback, errorCallback) {
        this.embeddedItemsService.postEmbeddedItem(embeddedItem, successCallback, errorCallback);
    }

    postVideo(video, successCallback, errorCallback) {
        this.embeddedItemsService.postVideo(video, successCallback, errorCallback);
    }

    deleteEmbeddedItem(embeddedItem, successCallback, errorCallback) {
        this.embeddedItemsService.deleteEmbeddedItem(embeddedItem, successCallback, errorCallback);
    }

    getEmbeddedItemStructure(callback) {
        this.embeddedItemsService.getVideoStructure(callback);
    }

    getSoundStructure(callback) {
        this.embeddedItemsService.getSoundStructure(callback);
    }

    /*
     * Gigs
     */

    getGigs(successCallback, errorCallback) {
        this.gigsService.getGigs(successCallback, errorCallback);
    }

    putGig(gig, successCallback, errorCallback) {
        this.gigsService.putGig(gig, successCallback, errorCallback);
    }

    postGig(gig, successCallback, errorCallback) {
        this.gigsService.postGig(gig, successCallback, errorCallback);

    }

    deleteGig(gig, successCallback, errorCallback) {
        this.gigsService.deleteGig(gig, successCallback, errorCallback);
    }

    getGigsStructure(callback) {
        this.gigsService.getGigsStructure(callback);
    }

    /*
     * Images and galleries
     */

    getGalleries(successCallback, errorCallback) {

        this.galleriesEndpoint.getRequest((galleries) => {

            let formattedGalleries = [];

            for (const GALLERY_NAME in galleries) {

                let gallery = Object.assign({}, galleries[GALLERY_NAME]);

                gallery.name = GALLERY_NAME;
                gallery.images = [];

                let images = galleries[GALLERY_NAME].images;
                for (const IMAGE_ID in images) {
                    gallery.images.push(images[IMAGE_ID]);
                }

                formattedGalleries.push(gallery);

            }
            successCallback(formattedGalleries);

        }, errorCallback);
    }

    putGallery(gallery, successCallback, errorCallback) {
        this.galleriesEndpoint.putRequest(gallery, successCallback, errorCallback);
    }

    postGallery(gallery, successCallback, errorCallback) {
        this.galleriesEndpoint.postRequest(gallery, successCallback, errorCallback);
    }

    deleteImage(image, successCallback, errorCallback) {
        console.log(image);
    }

    deleteGallery(gallery, successCallback, errorCallback) {
        this.galleriesEndpoint.deleteRequest(gallery, successCallback, errorCallback);
    }

    getGalleryStructure(callback) {

        callback([
            {
                label: 'Galleriomslag:',
                fields: {
                    galleryCover: image
                }
            },
            {
                label: 'Omodifierade bilder:',
                fields: {
                    images: imageCollection
                }
            },
            {
                label: 'Tillagda bilder:',
                fields: {
                    addedImages: temporaryImageCollection
                }
            },
            {
                label: 'Borttagna bilder:',
                fields: {
                    deleted: deletedImageCollection
                }
            },
            {
                label: 'Lägg till ny(a) bild(er):',
                fields: {
                    addImages: imageUpload
                }
            },
            {
                label: 'Galleriets namn:',
                fields: {
                    name: text
                }
            }
        ]);
    }

    /*
     * Members
     */

    getMembers(successCallback, errorCallback) {
        this.membersEndpoint.getRequest(successCallback, errorCallback);
    }

    putMember(member, successCallback, errorCallback) {
        this.membersEndpoint.putRequest(member, successCallback, errorCallback);
    }

    postMember(member, successCallback, errorCallback) {
        this.membersEndpoint.postRequest(member, successCallback, errorCallback);
    }

    deleteMember(member, successCallback, errorCallback) {
        this.membersEndpoint.deleteRequest(member, successCallback, errorCallback);
    }

    getMemberStructure(callback) {

        callback([
            {
                label: '',
                fields: {
                    firstname: text,
                    lastname: text,
                    instrument: text
                }
            }
        ]);
    }

    /*
     * Users
     */

    getUser(username, password, successCallback, errorCallback) {

        this.usersEndpoint.getRequest(successCallback, errorCallback, null, {
            username: username,
            password: password
        });
    }
}

export default Data;