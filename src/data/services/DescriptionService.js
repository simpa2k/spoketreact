import Service from "./Service";
import {textarea} from "../formStructure/inputs";
const Endpoint = require('../../../src/data/endpoint/Endpoint');

const DESCRIPTION_STRUCTURE = {
    label: '',
    fields: {
        content: textarea
    }
};

class DescriptionService extends Service {

    constructor() {
        super(new Endpoint('description', true, false, false));
    }

    getDescription(successCallback, errorCallback) {

        this.endpoint.getRequest((fulfilled) => {
             successCallback(fulfilled[0]);
         }, errorCallback);
    }

    putDescription(description, successCallback, errorCallback) {
        this.endpoint.putRequest(description, successCallback, errorCallback);
    }

    getDescriptionStructure(callback) {
        callback(DESCRIPTION_STRUCTURE);
    }
}

export {DESCRIPTION_STRUCTURE, DescriptionService};
export default DescriptionService;
