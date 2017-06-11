const chai = require('chai');
const expect = require('chai').expect;
const sinon = require('sinon');

const Endpoint = require('../../src/data/endpoint/Endpoint');
import Data from '../../src/data/Data.js';

describe('Data', () => {

    let endpoints = {

        contactPersonsEndpoint: new Endpoint('contactpersons', true, true, true),
        descriptionEndpoint: new Endpoint('description', true, false, false),
        embeddedItemsEndpoint: new Endpoint('embeddeditems', true, true, true),
        gigsEndpoint: new Endpoint('gigs', true, true, true),
        imagesEndpoint: new Endpoint('images', true, true, true),
        membersEndpoint: new Endpoint('members', true, true, true),
        usersEndpoint: new Endpoint('users', false, false, false),
        venuesEndpoint: new Endpoint('venues', true, true, false)

    };

    let data = new Data(endpoints);

    describe('Get contact persons', () => {

        let contactInfo = {
            email: 'spoketikoket@gmail.com',
            contactPersons: [
                {
                    hejsan: 'hoppsan'
                }
            ]
        };

        let contactPersonsEndpoint = sinon.stub(endpoints.contactPersonsEndpoint, 'getRequest').callsFake((successCallback) => {
            successCallback(contactInfo.contactPersons);
        });

        it('should return email on getting contact persons', () => {

            data.getContactInfo((contactInfoResponse) => {
                expect(contactInfoResponse.email).to.equal(contactInfo.email);
            });
        });

        it('should return contact persons on getting contact persons', () => {

            data.getContactInfo((contactInfoResponse) => {
                expect(contactInfoResponse.contactPersons).to.equal(contactInfo.contactPersons);
            });
        });
    });
});
