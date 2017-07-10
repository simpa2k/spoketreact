import Service from "./Service";

import {

    image,
    imageCollection,
    temporaryImageCollection,
    deletedImageCollection,
    imageUpload,
    text

} from '../../../src/data/formStructure/inputs';

const Endpoint = require('../../../src/data/endpoint/Endpoint');

const GALLERY_STRUCTURE = [
     {
        label: 'Galleriomslag:',
        fields: {
            galleryCover: image
        }
    },
    {
        label: 'Omodifierade bilder:',
        fields: {
            images: imageCollection
        }
    },
    {
        label: 'Tillagda bilder:',
        fields: {
            addedImages: temporaryImageCollection
        }
    },
    {
        label: 'Borttagna bilder:',
        fields: {
            deleted: deletedImageCollection
        }
    },
    {
        label: 'Lägg till ny(a) bild(er):',
        fields: {
            addImages: imageUpload
        }
    },
    {
        label: 'Galleriets namn:',
        fields: {
            name: text
        }
    }
];

class GalleriesService extends Service {

    constructor() {
        super(new Endpoint('images/galleries', true, true, true));
    }

    getGalleries(successCallback, errorCallback) {

        this.endpoint.getRequest((galleries) => {

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

    }

    postGallery(gallery, successCallback, errorCallback) {

    }

    deleteGallery(gallery, successCallback, errorCallback) {

    }

    deleteImage(image, successCallback, errorCallback) {

    }

    getGalleryStructure(callback) {
        callback(GALLERY_STRUCTURE);
    }
}

export {GALLERY_STRUCTURE, GalleriesService};
export default GalleriesService;