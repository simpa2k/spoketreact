import GigsService from './services/GigsService';
import ContactPersonsService from "./services/ContactPersonsService";
import DescriptionService from "./services/DescriptionService";
import EmbeddedItemsService from "./services/EmbeddedItemsService";
import GalleriesService from "./services/GalleriesService";
import MembersService from "./services/MembersService";
import UsersService from "./services/UsersService";

class Data {

    constructor() {

        this.contactPersonsService = new ContactPersonsService();
        this.descriptionService = new DescriptionService();
        this.embeddedItemsService = new EmbeddedItemsService();
        this.gigsService = new GigsService();
        this.galleriesService = new GalleriesService();
        this.membersService = new MembersService();
        this.usersService = new UsersService();

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
        this.putGallery = this.putGallery.bind(this);
        this.postGallery = this.postGallery.bind(this);
        this.deleteGallery = this.deleteGallery.bind(this);
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
        this.galleriesService.getGalleries(successCallback, errorCallback);
    }

    putGallery(gallery, successCallback, errorCallback) {
        this.galleriesService.putGallery(gallery, successCallback, errorCallback);
    }

    postGallery(gallery, successCallback, errorCallback) {
        this.galleriesService.postGallery(gallery, successCallback, errorCallback);
    }

    deleteImage(image, successCallback, errorCallback) {
        this.galleriesService.deleteImage(image, successCallback, errorCallback);
    }

    deleteGallery(gallery, successCallback, errorCallback) {
        this.galleriesService.deleteGallery(gallery, successCallback, errorCallback);
    }

    getGalleryStructure(callback) {
        this.galleriesService.getGalleryStructure(callback);
    }

    /*
     * Members
     */

    getMembers(successCallback, errorCallback) {
        this.membersService.getMembers(successCallback, errorCallback);
    }

    putMember(member, successCallback, errorCallback) {
        this.membersService.putMember(member, successCallback, errorCallback);
    }

    postMember(member, successCallback, errorCallback) {
        this.membersService.postMember(member, successCallback, errorCallback);
    }

    deleteMember(member, successCallback, errorCallback) {
        this.membersService.deleteMember(member, successCallback, errorCallback);
    }

    getMemberStructure(callback) {
        this.membersService.getMemberStructure(callback);
    }

    /*
     * Users
     */

    getUser(username, password, successCallback, errorCallback) {
        this.usersService.getUser(username, password, successCallback, errorCallback);
    }
}

export default Data;