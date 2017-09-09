import Data from "../../../src/data/Data";
import {getRequest, putRequest, postRequest, deleteRequest} from "../../../src/data/requests/requests";

const expect = require('chai').expect;
const assert = require('chai').assert;
const sinon = require('sinon');

const fs = require('fs');
const path = require('path');

const FileAPI = require('file-api');
const File = FileAPI.File;
const FileReader = FileAPI.FileReader;

const helpers = require('../../helpers/helpers');
const assertProvidesCorrectArgumentsToRequestFunction = helpers.assertProvidesCorrectArgumentsToRequestFunction;

describe('Galleries Stack', () => {

    let data = new Data();

    let createReadStream = (imageName) => {
        return fs.createReadStream(path.join(__dirname, imageName));
    };

    /*
     * node form-data expects streams rather than File objects, see
     * the comment under describe('Modify Gallery') below.
     *
     * Also, only setting the file attribute as the url property
     * is only needed for displaying images in the browser temporarily.
     * See for example FileUpload.jsx.
     */
    let createGalleryFile = (imageName) => {
        return {file: createReadStream(imageName)};
    };

    /*
     * The formats in which to send galleries and in which you receive
     * them differ slightly. Not ideal.
     */
    let retrievedGalleryToSentGallery = (gallery) => {

        let convertedGallery = Object.assign({}, gallery);

        convertedGallery.galleryname = gallery.name;
        delete convertedGallery.name;

        return convertedGallery;

    };

    before((done) => {

        helpers.login(() => {

            done();

        }, (error) => {

            done(error);

        });
    });

    describe('Get galleries', () => {

        it('should get galleries', (done) => {

            data.getGalleries((galleries) => {

                expect(galleries).to.be.an('array');

                for (let gallery of galleries) {

                    expect(gallery).to.be.an('object');

                    expect(gallery).to.include.own.property('images');
                    expect(gallery).to.include.own.property('galleryCover');
                    expect(gallery).to.include.own.property('name');

                    expect(gallery.images).to.be.an('array');
                    expect(gallery.galleryCover).to.be.a('string');
                    expect(gallery.name).to.be.a('string');

                }

                done();

            }, (error) => {

                console.error('Error while getting galleries: ', error);
                done();

            });
        });
    });

    describe('Modify gallery', () => {

        /*
         * The FormData implementation has to be switched as isomorphic-fetch won't add headers
         * automatically if we're not using node form-data. This is due to the fact that it relies
         * on getBoundary() to set the boundary on multipart/form-requests, which window.FormData
         * does not have. See:
         *
         * node_modules/node-fetch/index.js, rows 87-89.
         *
         * window.FormData will work fine in the actual browser, however.
         */
        window.FormData = require('form-data');

        let sampleNewGallery = {

            galleryname: 'Test gallery',
            addedImages: [createGalleryFile('sample_image.jpg'),
                          createGalleryFile('sample_image_2.jpg')]

        };

        let gallery = {};

        it('should post gallery', (done) => {

            data.postGallery(sampleNewGallery, () => {

                data.getGalleries((galleries) => {

                    gallery = galleries.find((retrievedGallery) => {
                        return retrievedGallery.name === sampleNewGallery.galleryname;
                    });

                    expect(gallery.name).to.equal(sampleNewGallery.galleryname);
                    expect(gallery.images.length).to.equal(sampleNewGallery.addedImages.length);

                    done();

                }, (error) => {
                    done(error);
                });

            }, (error) => {
                done(error);
            });
        });

        /*it('should put gallery', (done) => {

            let updatedGallery = Object.assign({}, gallery);
            updatedGallery.addedImages = [createGalleryFile('sample_image_3.jpg')];

            updatedGallery = retrievedGalleryToSentGallery(updatedGallery);

            data.putGallery(updatedGallery, () => {

                data.getGalleries((galleries) => {

                    console.log(galleries);
                    let result = galleries.find((retrievedGallery) => {
                        return retrievedGallery.name === updatedGallery.name;
                    });

                    expect(result.images.length).to.equal(updatedGallery.images.length + updatedGallery.addedImages.length);

                    done();

                }, (error) => {
                    done(error);
                });

            }, (error) => {
                done(error);
            });
        });*/

        it('should delete gallery', (done) => {

            data.deleteGallery(retrievedGalleryToSentGallery(gallery), () => {
                done();
            }, (error) => {
                done(error);
            });
        });
    });
});