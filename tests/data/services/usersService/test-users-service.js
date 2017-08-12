const expect = require('chai').expect;
const sinon = require('sinon');

import UsersService from "../../../../src/data/services/UsersService";

describe('UsersService', () => {

    let usersService = new UsersService();

    describe('getUser', () => {

        it('should call endpoint get function with username and password as url parameters', () => {

            let stub = sinon.stub(usersService.endpoint, 'getRequest');

            let username = 'user';
            let password = 'password';

            let successCallback = sinon.spy();
            let errorCallback = sinon.spy();

            usersService.getUser(username, password, successCallback, errorCallback);

            sinon.assert.calledWith(stub, successCallback, errorCallback, null, {
                username: username,
                password: password
            });
        });
    });
});
