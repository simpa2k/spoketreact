import Service from './Service';
import Endpoint from '../endpoint/Endpoint';

/**
 * Class for operating on gigs. Transparently handles venues as well.
 */
class GigsService extends Service {

    constructor() {

        super(new Endpoint('gigs', true, true, true));
        this.venuesEndpoint = new Endpoint('venues', true, true, false);

    }

    /*
     * Gigs
     */

    getGigs(successCallback, errorCallback) {

        const GIG_TIME_NULL_CODE = '01:01:01';

        this.endpoint.getRequest((gigs) => {

            this.setVenues();
            successCallback(gigs.map((gig) => {

                let dateAndTime = gig.datetime.split(' ');

                if (dateAndTime[1] === GIG_TIME_NULL_CODE) {
                    gig.datetime = dateAndTime[0];
                }

                return gig;

            }));

        }, errorCallback);
    }

    prepareGigModification(gig) {

        this.sendVenue(gig);

        gig.venue_name = gig.name;

        delete gig.address;
        delete gig.name;
        delete gig.city;
        delete gig.webpage;

    }

    putGig(gig, successCallback, errorCallback) {

        this.prepareGigModification(gig);
        this.endpoint.putRequest(gig, successCallback, errorCallback);

    }

    postGig(gig, successCallback, errorCallback) {

        this.prepareGigModification(gig);
        this.endpoint.postRequest(gig, successCallback, errorCallback);

    }

    deleteGig(gig, successCallback, errorCallback) {
        console.log('Deleting' + JSON.stringify(gig, null, 4));
        this.endpoint.deleteRequest(gig, successCallback, errorCallback);
    }

    getGigsStructure(callback) {

        this.setVenues((venues) => {

            callback([
                {
                    label: 'Välj datum och tid:',
                    fields: {
                        datetime: datetime
                    }
                },
                {
                    label: 'Annan nyttig information:',
                    fields: {
                        ticketlink: text,
                        info: text,
                        price: text
                    }
                },
                {
                    label: 'Välj spelställe:',
                    fields: {
                        address: text,
                        name: new AutocompletedText(venues, (venue, targetValue) => {
                            return venue.name === targetValue;
                        }),
                        city: text,
                        webpage: text
                    }
                }
            ]);
        })
    }

    /*
     * Venues
     */

    setVenues(successCallback, errorCallback) {

        this.getVenues((venues) => {

            this.venues = venues;

            if (typeof(successCallback) !== 'undefined') {
                successCallback(venues)
            }

        }, (error) => {

            console.error('Error while getting venues: ' + JSON.stringify(error, null, 4));

            if (typeof(errorCallback) !== 'undefined') {
                errorCallback(error);
            }
        });
    }

    modifyVenueAndUpdate(venue, modifyingFunction) {

        modifyingFunction(venue, () => {
            this.setVenues();
        }, (error) => {
            console.error('Error while updating venue with function: ' + modifyingFunction + ': ' + JSON.stringify(error, null, 4));
        })
    }

    /*
     * Having this kind of logic here could be discussed. The reason for it is mainly to simplify
     * automatic generation of admin pages. The kind of foreign key relationship between gigs and
     * venues that require venues to be sent before gigs is hard to generalize in a good way.
     * This is mainly because of the fact that the relationship is not apparent when getting data from the
     * server, only when modifying it, which of course was a pretty poor design choice. The fact that
     * this is a backend quirk suggests handling it in the interface towards the backend.
     */
    sendVenue(gig) {

        let selectedVenue = {

            address: gig.address,
            name: gig.name,
            city: gig.city,
            webpage: gig.webpage

        };

        if (typeof(this.venues) !== 'undefined') {

            let venueForComparison = this.venues.find((venue) => {
                return venue.name === selectedVenue.name;
            });

            if (typeof(venueForComparison) === 'undefined') {

                // If there is no venue with the specified name, post the venue (i.e. create it).
                console.log('Posting venue: ' + JSON.stringify(selectedVenue));
                this.modifyVenueAndUpdate(selectedVenue, this.postVenue);

            } else if (JSON.stringify(selectedVenue) !== JSON.stringify(venueForComparison)) { // The order of the properties in selectedVenue matters here

                /*
                 * If there is a venue with the specified name, but some of the other fields have been changed,
                 * put the venue (i.e. update it).
                 */

                console.log('Putting venue: ' + JSON.stringify(selectedVenue));
                this.modifyVenueAndUpdate(selectedVenue, this.putVenue);
            }

        } else {
            console.error('Venues undefined when trying to operate on gigs.');
        }
    }

    getVenues(successCallback, errorCallback) {
        this.venuesEndpoint.getRequest(successCallback, errorCallback);
    }

    postVenue(venue, successCallback, errorCallback) {
        this.venuesEndpoint.postRequest(venue, successCallback, errorCallback);
    }

    putVenue(venue, successCallback, errorCallback) {
        this.venuesEndpoint.putRequest(venue, successCallback, errorCallback);
    }
}

export default GigsService;