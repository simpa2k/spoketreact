import { text, AutocompletedText, datetime, textarea } from './formStructure/inputs';

class Data {

    constructor(endpoints) {

        this.contactPersonsEndpoint = endpoints.contactPersonsEndpoint;
        this.descriptionEndpoint = endpoints.descriptionEndpoint;
        this.embeddedItemsEndpoint = endpoints.embeddedItemsEndpoint;
        this.gigsEndpoint = endpoints.gigsEndpoint;
        this.imagesEndpoint = endpoints.imagesEndpoint;
        this.membersEndpoint = endpoints.membersEndpoint;
        this.usersEndpoint = endpoints.usersEndpoint;
        this.venuesEndpoint = endpoints.venuesEndpoint;

        this.getGigs = this.getGigs.bind(this);
        this.putGig = this.putGig.bind(this);
        this.postGig = this.postGig.bind(this);
        this.deleteGig = this.deleteGig.bind(this);
        this.getGigsStructure = this.getGigsStructure.bind(this);

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

        this.gigsEndpoint.getRequest((gigs) => {

            this.setVenues();
            successCallback(gigs);

        }, errorCallback);
    }

    putGig(gig, successCallback, errorCallback) {

        this.sendVenue(gig);
        console.log('Putting ' + JSON.stringify(gig, null, 4));
        //this.gigsEndpoint.putRequest(gig, successCallback, errorCallback);
    }

    postGig(gig, successCallback, errorCallback) {
        console.log('Posting' + JSON.stringify(gig, null, 4));
        //this.gigsEndpoint.postRequest(gig, successCallback, errorCallback);
    }

    deleteGig(gig, successCallback, errorCallback) {
        console.log('Deleting' + JSON.stringify(gig, null, 4));
        //this.gigsEndpoint.deleteRequest(gig, successCallback, errorCallback);
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
                //this.modifyVenueAndUpdate(selectedVenue, this.postVenue);

            } else if (JSON.stringify(selectedVenue) !== JSON.stringify(venueForComparison)) { // The order of the attributes in selectedVenue matters here

                /*
                 * If there is a venue with the specified name, but some of the other fields have been changed,
                 * put the venue (i.e. update it).
                 */

                console.log('Putting venue: ' + JSON.stringify(selectedVenue));
                //this.modifyVenueAndUpdate(selectedVenue, this.putVenue);
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

export default Data;