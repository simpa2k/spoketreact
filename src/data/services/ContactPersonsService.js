import Service from "./Service";
import Endpoint from '../endpoint/Endpoint';

const EMAIL  = 'spoketikoket@gmail.com';

class ContactPersonsService extends Service {

    constructor() {
        super(new Endpoint('contactPersons', true, true, true));
    }

    getRequest(successCallback, errorCallback) {

        this.endpoint.getRequest((fulfilled) => {

             successCallback({

                 email: EMAIL,
                 contactPersons: fulfilled

             });

         }, errorCallback);
    }

    putRequest(contactPerson, successCallback, errorCallback) {
        this.endpoint.putRequest(contactPerson, successCallback, errorCallback);
    }

    postRequest(contactPerson, successCallback, errorCallback) {
        this.endpoint.postRequest(contactPerson, successCallback, errorCallback);
    }

    deleteRequest(contactPerson, successCallback, errorCallback) {
        this.endpoint.deleteRequest(contactPerson, successCallback, errorCallback);
    }
}

export {EMAIL, ContactPersonsService};
export default ContactPersonsService;
