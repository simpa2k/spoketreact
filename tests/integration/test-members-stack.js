import Data from "../../src/data/Data";
import {getRequest, putRequest, postRequest, deleteRequest} from "../../src/data/requests/requests";

const expect = require('chai').expect;
const sinon = require('sinon');

const helpers = require('../helpers/helpers');
const assertProvidesCorrectArgumentsToRequestFunction = helpers.assertProvidesCorrectArgumentsToRequestFunction;

describe('Member Stack', () => {

    const SERVER_ROOT = helpers.serverRoot;
    const endpoint = '/members';

    const absolutePath = SERVER_ROOT + endpoint;

    const createOptions = (member) => {

        return {
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(member)
        }
    };

    before((done) => {

        helpers.login(() => {

            done();

        }, (error) => {

            console.error('Could not login. Error: ', error);
            done();

        });
    });

    describe('Get member', () => {

        let parameters = {};
        let options = {};

        it('should get members when provided with correct arguments', () => {

            getRequest(absolutePath, parameters, options, (members) => {

                expect(members).to.be.an('array');

                for (let member of members) {

                    /*
                     * The reason for using several lines of property checking
                     * is that the use of keys throws a reference error
                     * complaining that HTMLElement is not defined.
                     * It doesn't seem possible to list several properties
                     * on the same line, since chai interprets that as
                     * being supposed to make a check that the first property
                     * has the same value as the following items in the list.
                     */
                    expect(member).to.include.own.property('instrument');
                    expect(member).to.include.own.property('firstname');
                    expect(member).to.include.own.property('lastname');
                    expect(member).to.include.own.property('id');

                }

            });
        });

        it('should provide correct arguments', () => {

            let data = new Data();
            let stubbedRequest = sinon.stub(data.membersService.endpoint.requests, 'getRequest');

            let successCallback = () => {};
            let errorCallback = () => {};

            data.getMembers(successCallback, errorCallback);
            sinon.assert.calledWith(stubbedRequest, absolutePath, {}, {}, successCallback, errorCallback, undefined);

        });
    });

    describe('Modify member', () => {

        let member = {
            instrument: "ett testinstrument",
            firstname: "Test",
            lastname: "Testsson"
        };

        it('should post member when provided with correct arguments', (done) => {

            postRequest(absolutePath, {}, createOptions(member), () => {

                getRequest(absolutePath, {}, {}, (members) => {

                    member = members.find((retrievedMember) => {

                        return member.instrument === retrievedMember.instrument &&
                               member.firstname === retrievedMember.firstname &&
                               member.lastname === retrievedMember.lastname;
                    });

                    expect(member.id).to.not.equal(undefined);

                    done();

                }, (error) => {

                    console.error(error);
                    done();

                });

            }, (error) => {

                console.error(error);
                done();

            }, (response) => {

                expect(response.status).to.equal(200);
                return response.json();

            });
        });

        it('should put member when provided with correct arguments', () => {

            let updatedMember = Object.assign({}, member);
            updatedMember.firstname = "Testaren";

            putRequest(absolutePath, updatedMember, {}, () => {

                getRequest(absolutePath, {id: updatedMember.id}, {}, (members) => {

                    let result = members[0];
                    expect(result.firstname).to.equal(updatedMember.firstname);

                    done();

                }, (error) => {

                    console.error(error);
                    done();

                });

            }, (error) => {

                console.error(error);
                done();

            }, (response) => {

                expect(response.status).to.equal(200);
                return response.json();

            });
        });

        it('should delete member when provided with correct arguments', () => {

            return deleteRequest(absolutePath, member, {}, () => {

            }, (error) => {

            }, (response) => {
                expect(response.status).to.equal(200);
            });
        });

        describe('Provide correct arguments for modification requests', () => {

            let data = new Data();

            let member = {};

            let memberWithId = Object.assign({id: 1}, member);

            assertProvidesCorrectArgumentsToRequestFunction.objectAsOptions(data.membersService, 'post', data.postMember, memberWithId);
            assertProvidesCorrectArgumentsToRequestFunction.objectAsOptions(data.membersService, 'put', data.putMember, memberWithId);
            assertProvidesCorrectArgumentsToRequestFunction.objectAsParameters(data.membersService, 'delete', data.deleteMember, memberWithId);

        });
    });
});