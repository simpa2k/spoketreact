import { text, AutocompletedText, datetime, textarea, image, imageCollection, deletedImageCollection } from './formStructure/inputs';

class Data {

    constructor(endpoints) {

        this.contactPersonsEndpoint = endpoints.contactPersonsEndpoint;
        this.descriptionEndpoint = endpoints.descriptionEndpoint;
        this.embeddedItemsEndpoint = endpoints.embeddedItemsEndpoint;
        this.gigsEndpoint = endpoints.gigsEndpoint;
        this.imagesEndpoint = endpoints.imagesEndpoint;
        this.galleriesEndpoint = endpoints.galleriesEndpoint;
        this.membersEndpoint = endpoints.membersEndpoint;
        this.usersEndpoint = endpoints.usersEndpoint;
        this.venuesEndpoint = endpoints.venuesEndpoint;

        this.bindDescriptionFunctions();
        this.bindEmbeddedItemFunctions();
        this.bindGigFunctions();
        this.bindImagesFunctions();
        this.bindMemberFunctions();

    }

    bindDescriptionFunctions() {

        this.getDescription = this.getDescription.bind(this);
        this.putDescription = this.putDescription.bind(this);
        this.getDescriptionStructure = this.getDescriptionStructure.bind(this);

    }

    bindEmbeddedItemFunctions() {
        
        this.getEmbeddedItems = this.getEmbeddedItems.bind(this);
        this.getVideos = this.getVideos.bind(this);
        this.getSounds = this.getSounds.bind(this);
        this.putEmbeddedItem = this.putEmbeddedItem.bind(this);
        this.putVideo = this.putVideo.bind(this);
        this.postEmbeddedItem = this.postEmbeddedItem.bind(this);
        this.postVideo = this.postVideo.bind(this);
        this.deleteEmbeddedItem = this.deleteEmbeddedItem.bind(this);
        
    }

    bindGigFunctions() {

        this.getGigs = this.getGigs.bind(this);
        this.putGig = this.putGig.bind(this);
        this.postGig = this.postGig.bind(this);
        this.deleteGig = this.deleteGig.bind(this);
        this.getGigsStructure = this.getGigsStructure.bind(this);

    }

    bindImagesFunctions() {
        
        this.getGalleries = this.getGalleries.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.getGalleryStructure = this.getGalleryStructure.bind(this);
        
    }

    bindMemberFunctions() {

        this.getMembers = this.getMembers.bind(this);
        this.putMember = this.putMember.bind(this);
        this.postMember = this.postMember.bind(this);
        this.deleteMember = this.deleteMember.bind(this);
        this.getMemberStructure = this.getMemberStructure.bind(this);

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
        this.descriptionEndpoint.getRequest((fulfilled) => {
            successCallback(fulfilled[0]);
        }, errorCallback);
    }

    putDescription(description, successCallback, errorCallback) {
        this.descriptionEndpoint.putRequest(description, successCallback, errorCallback);
    }

    getDescriptionStructure(callback) {

        callback([
            {
                label: '',
                fields: {
                    content: textarea
                }
            }
        ]);

    }

    /*
     * Embedded items
     */

    getEmbeddedItems(successCallback, errorCallback) {
        this.embeddedItemsEndpoint.getRequest(successCallback, errorCallback);
    }

    getVideos(successCallback, errorCallback) {

        this.embeddedItemsEndpoint.getRequest((fulfilled) => {

            successCallback(fulfilled.map((video) => {

                video.externalId = video.src.split('/').pop();
                return video;

            }));

        }, errorCallback, null, {
            type: 'video'
        });
    }

    getSounds(successCallback, errorCallback) {

        this.embeddedItemsEndpoint.getRequest((fulfilled) => {

            successCallback(fulfilled.map((sound) => {

                sound.externalId = sound.src;
                return sound;

            }));
        }, errorCallback, null, {
            type: 'sound'
        });
    }

    putEmbeddedItem(embeddedItem, successCallback, errorCallback) {
        this.embeddedItemsEndpoint.putRequest(embeddedItem, successCallback, errorCallback);
    }

    setType(embeddedItem, type) {

        if (typeof(embeddedItem.type) === 'undefined' || embeddedItem.type !== type) {
            embeddedItem.type = type;
        }
    }

    modifyVideosRepository(video, modificationFunction, successCallback, errorCallback) {

        this.setType(video, 'video');
        modificationFunction(video, successCallback, errorCallback);

    }

    putVideo(video, successCallback, errorCallback) {
        this.modifyVideosRepository(video, this.embeddedItemsEndpoint.putRequest, successCallback, errorCallback);
    }

    postEmbeddedItem(embeddedItem, successCallback, errorCallback) {
        this.embeddedItemsEndpoint.postRequest(embeddedItem, successCallback, errorCallback);
    }

    postVideo(video, successCallback, errorCallback) {
        this.modifyVideosRepository(video, this.embeddedItemsEndpoint.postRequest, successCallback, errorCallback);
    }

    deleteEmbeddedItem(embeddedItem, successCallback, errorCallback) {
        this.embeddedItemsEndpoint.deleteRequest(embeddedItem, successCallback, errorCallback);
    }

    getEmbeddedItemStructure(callback) {

        callback([
            {
                label: 'Ange den inbäddade videons id',
                fields: {
                    externalId: text
                }
            }
        ]);
    }

    getSoundStructure(callback) {

        callback([
            {
                label: 'Ange det inbäddade ljudets url',
                fields: {
                    src: text
                }
            }
        ]);
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
     * Images and galleries
     */

    getGalleries(successCallback, errorCallback) {

        this.galleriesEndpoint.getRequest((galleries) => {

            let formattedGalleries = [];

            for (const GALLERY_NAME in galleries) {

                let gallery = Object.assign({}, galleries[GALLERY_NAME]);

                gallery.name = GALLERY_NAME;
                gallery.images = [];

                let images = galleries[GALLERY_NAME].images;
                for (const IMAGE_ID in images) {
                    gallery.images.push(images[IMAGE_ID]);
                }

                formattedGalleries.push(gallery);

            }
            successCallback(formattedGalleries);

        }, errorCallback);
    }

    putGallery(gallery, successCallback, errorCallback) {
        this.galleriesEndpoint.putRequest(gallery, successCallback, errorCallback);
    }

    postGallery(gallery, successCallback, errorCallback) {
        this.galleriesEndpoint.postRequest(gallery, successCallback, errorCallback);
    }

    deleteImage(image, successCallback, errorCallback) {
        console.log(image);
    }

    deleteGallery(gallery, successCallback, errorCallback) {
        this.galleriesEndpoint.deleteRequest(gallery, successCallback, errorCallback);
    }

    getGalleryStructure(callback) {

        callback([
            {
                label: 'Galleriomslag:',
                fields: {
                    galleryCover: image
                }
            },
            {
                label: 'Bilder:',
                fields: {
                    images: imageCollection
                }
            },
            {
                label: 'Borttagna bilder:',
                fields: {
                    deleted: deletedImageCollection
                }
            },
            {
                label: 'Galleriets namn:',
                fields: {
                    name: text
                }
            }
        ]);
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

    getMemberStructure(callback) {

        callback([
            {
                label: '',
                fields: {
                    firstname: text,
                    lastname: text,
                    instrument: text
                }
            }
        ]);
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
                //this.modifyVenueAndUpdate(selectedVenue, this.postVenue);

            } else if (JSON.stringify(selectedVenue) !== JSON.stringify(venueForComparison)) { // The order of the properties in selectedVenue matters here

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