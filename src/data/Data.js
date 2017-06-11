import Endpoint from './endpoints/Endpoint';

class Data {

    constructor() {

        this.contactPersonsEndpoint = new Endpoint('contactpersons', true, true, true);
        this.descriptionEndpoint = new Endpoint('description', true, false, false);
        this.embeddedItemsEndpoint = new Endpoint('embeddeditems', true, true, true);
        this.gigsEndpoint = new Endpoint('gigs', true, true, true);
        this.imagesEndpoint = new Endpoint('images', true, true, true);
        this.membersEndpoint = new Endpoint('members', true, true, true);
        this.usersEndpoint = new Endpoint('users', false, false, false);
        this.venuesEndpoint = new Endpoint('venues', true, true, false);

    }

    getGigsModel() {
        return {
            datetime: 'datetime'
        }
    }

    getDescriptionModel() {
        return {
            content: 'text'
        }
    }

    /*
     * Contact persons
     */

    getContactInfo(successCallback, errorCallback) {

        this.contactPersonsEndpoint.getRequest((fulfilled) => {

            successCallback({

                email: 'spoketikoket@gmail.com',
                contactPersons: fulfilled

            });

        }, errorCallback);
    }

    putContactPerson(contactPerson, successCallback, errorCallback) {
        this.contactPersonsEndpoint.putRequest(contactPerson, successCallback, errorCallback);
    }

    postContactPerson(contactPerson, successCallback, errorCallback) {
        this.contactPersonsEndpoint.postRequest(contactPerson, successCallback, errorCallback);
    }

    deleteContactPerson(contactPerson, successCallback, errorCallback) {
        this.contactPersonsEndpoint.deleteRequest(contactPerson, successCallback, errorCallback);
    }

    /*
     * Description
     */

    getDescription(successCallback, errorCallback) {
        this.descriptionEndpoint.getRequest(successCallback, errorCallback);
    }

    putDescription(description, successCallback, errorCallback) {
        this.descriptionEndpoint.putRequest(description, successCallback, errorCallback);
    }

    /*
     * Embedded items
     */

    getEmbeddedItems(successCallback, errorCallback) {
        this.embeddedItemsEndpoint.getRequest(successCallback, errorCallback);
    }

    putEmbeddedItem(embeddedItem, successCallback, errorCallback) {
        this.embeddedItemsEndpoint.putRequest(embeddedItem, successCallback, errorCallback);
    }

    postEmbeddedItem(embeddedItem, successCallback, errorCallback) {
        this.embeddedItemsEndpoint.postRequest(embeddedItem, successCallback, errorCallback);
    }

    deleteEmbeddedItem(embeddedItem, successCallback, errorCallback) {
        this.embeddedItemsEndpoint.deleteRequest(embeddedItem, successCallback, errorCallback);
    }

    /*
     * Gigs
     */

    getGigs(successCallback, errorCallback) {
        this.gigsEndpoint.getRequest(successCallback, errorCallback);
    }

    putGig(gig, successCallback, errorCallback) {
        this.gigsEndpoint.putRequest(gig, successCallback, errorCallback);
    }

    postGig(gig, successCallback, errorCallback) {
        this.gigsEndpoint.postRequest(gig, successCallback, errorCallback);
    }

    deleteGig(gig, successCallback, errorCallback) {
        this.gigsEndpoint.deleteRequest(gig, successCallback, errorCallback);
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
}

export default Data;