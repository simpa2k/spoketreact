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

    getNewsItems() {

        return [
            'Det här är den första nyheten!',
            'Det här är den andra nyheten!',
            'Här är en nyhet till!'
        ];
    }

    getGigs(successCallback, errorCallback) {
        this.gigsEndpoint.getRequest(successCallback, errorCallback);
    }

    getDescription(successCallback, errorCallback) {
        this.descriptionEndpoint.getRequest(successCallback, errorCallback);
    }

    getMembers(successCallback, errorCallback) {
        this.membersEndpoint.getRequest(successCallback, errorCallback);
    }

    getEmbeddedItems(successCallback, errorCallback) {
        this.embeddedItemsEndpoint.getRequest(successCallback, errorCallback);
    }

    getContactInfo(successCallback, errorCallback) {

        this.contactPersonsEndpoint.getRequest((fulfilled) => {

            successCallback({

                email: 'spoketikoket@gmail.com',
                contactPersons: fulfilled

            });

        }, errorCallback);
    }
}

export default Data;