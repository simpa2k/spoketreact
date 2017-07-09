const expect = require('chai').expect;
const sinon = require('sinon');

import GigsService from '../../../../src/data/services/GigsService';

const getGig = (gigsService) => {

    gigsService.venues = [{
        address: "Stigbergstorget 8",
        name: "Oceanen",
        city: "Göteborg",
        webpage: ''
    }];

    return {

        ticketlink:	"http://oceanen.com/2015/09/21/16-10-spoket-i-koket",
        info: "Insläpp kl. 19.",
        price: 120,
        datetime: "2015-10-16 01:01:01",
        id: 140,
        venue_name:	"Oceanen",
        address: "Stigbergstorget 8",
        name: "Oceanen",
        city: "Göteborg",
        webpage: ''

    }
};

describe('GigsService', () => {

    let gigsService;

    const SAMPLE_GIGS = require('./sampleGigs.json');
    const SAMPLE_VENUES = require('./sampleVenues.json');

    let putRequest;
    let postRequest;
    let deleteRequest;

    beforeEach(() => {

        gigsService = new GigsService();

        sinon.stub(gigsService.endpoint, 'getRequest').callsFake((successCallback) => {
            successCallback(SAMPLE_GIGS)
        });

        putRequest = sinon.stub(gigsService.endpoint, 'putRequest').callsFake((gig, successCallback) => {
            successCallback()
        });

        postRequest = sinon.stub(gigsService.endpoint, 'postRequest').callsFake((gig, successCallback) => {
            successCallback()
        });

        deleteRequest = sinon.stub(gigsService.endpoint, 'deleteRequest').callsFake((gig, successCallback) => {
            successCallback()
        });

        sinon.stub(gigsService.venuesEndpoint, 'getRequest').callsFake((successCallback) => {
            successCallback(SAMPLE_VENUES);
        });
    });

    describe('getGigs', () => {

        it('should get gigs', () => {

            gigsService.getGigs((gigs) => {
                expect(gigs.length).to.equal(SAMPLE_GIGS.length);
            });
        });

        it('should format gig dates', () => {

            gigsService.getGigs((gigs) => {

                gigs.forEach((gig) => {
                    expect(gig.datetime).to.not.include('01:01:01');
                });
            });
        });

        it('should set venues', () => {

            let setVenues = sinon.spy(gigsService, 'setVenues');

            gigsService.getGigs(() => {
                sinon.assert.calledOnce(setVenues);
            });
        });
    });

    describe('putGig', () => {

        it('should prepare gig for modification', () => {

            let prepareGigModification = sinon.spy(gigsService, 'prepareGigModification');

            gigsService.putGig(getGig(gigsService), () => {
                sinon.assert.calledOnce(prepareGigModification);
            }, () => {});
        });

        it('should call endpoint put function', () => {

            gigsService.putGig(getGig(gigsService), () => {
                sinon.assert.calledOnce(putRequest);
            });
        });
    });

    describe('postGig', () => {

        it('should prepare gig for modification', () => {

            let prepareGigModification = sinon.spy(gigsService, 'prepareGigModification');

            gigsService.postGig(getGig(gigsService), () => {
                sinon.assert.calledOnce(prepareGigModification);
            }, () => {});
        });

        it('should call endpoint post function', () => {

            gigsService.postGig(getGig(gigsService), () => {
                sinon.assert.calledOnce(postRequest);
            });
        });
    });

    describe('deleteGig', () => {

        it('should call endpoint delete function', () => {

            gigsService.deleteGig(getGig(gigsService), () => {
                sinon.assert.calledOnce(deleteRequest);
            });
        });
    });

    describe('prepareGigModification', () => {

        it('should send venue', () => {

            let sendVenue = sinon.spy(gigsService, 'sendVenue');
            gigsService.prepareGigModification(getGig(gigsService));

            sinon.assert.calledOnce(sendVenue);

        });

        it('should set venue_name to be equal to name', () => {

            let gigToBeSent = getGig(gigsService);

            let name = gigToBeSent.name;
            gigToBeSent.venue_name = '';

            gigsService.prepareGigModification(gigToBeSent);

            expect(gigToBeSent.venue_name).to.equal(name);

        });

        it('should delete venue related properties from the gig in question', () => {

            let gigToBeSent = getGig(gigsService);

            gigsService.prepareGigModification(gigToBeSent);

            expect(typeof(gigToBeSent.address)).to.equal('undefined');
            expect(typeof(gigToBeSent.name)).to.equal('undefined');
            expect(typeof(gigToBeSent.city)).to.equal('undefined');
            expect(typeof(gigToBeSent.webpage)).to.equal('undefined');

        });
    });
});
