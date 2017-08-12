import Service from "./Service";
import Endpoint from "../endpoint/Endpoint";

class UsersService extends Service {

    constructor() {
        super(new Endpoint('users', false, false, false));
    }

    getUser(username, password, successCallback, errorCallback) {

        this.endpoint.getRequest(successCallback, errorCallback, null, {
            username: username,
            password: password
        });
    }
}

export default UsersService;