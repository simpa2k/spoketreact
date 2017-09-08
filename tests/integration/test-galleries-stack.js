import Data from "../../src/data/Data";
import {getRequest, putRequest, postRequest, deleteRequest} from "../../src/data/requests/requests";

const expect = require('chai').expect;
const assert = require('chai').assert;
const sinon = require('sinon');

const fs = require('fs');

const FileAPI = require('file-api');
const File = FileAPI.File;
const FileReader = FileAPI.FileReader;

const helpers = require('../helpers/helpers');
const assertProvidesCorrectArgumentsToRequestFunction = helpers.assertProvidesCorrectArgumentsToRequestFunction;

describe('Galleries Stack', () => {

    let data = new Data();

    let readFiles = (files, handler) => {

        let reader = new FileReader();
        let readFiles = [];

        let readFile = (index) => {

            if (index >= files.length) {
                return;
            }

            let file = files[index];

            reader.onload = (event) => {

                readFiles.push(event.target.result);
                readFile(++index);

            };

            reader.readAsDataURL(new File(file));

        };
        readFile(0);

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

        let gallery = {};
        let images = [process.cwd() + '/tests/unit/data/services/galleriesService/sampleImage.jpg',
                      process.cwd() + '/tests/unit/data/services/galleriesService/sampleImage.jpg',
                      process.cwd() + '/tests/unit/data/services/galleriesService/sampleImage.jpg'];

        let sampleNewGallery = {
            name: 'Test gallery',
            addedImages: []
        };

        it('should post gallery', (done) => {

            let fileReader = new FileReader();

            fileReader.onload = (event) => {

                sampleNewGallery.addedImages.push(event.target.result);

                if (sampleNewGallery.addedImages.length === images.length) {

                    data.postGallery(sampleNewGallery, () => {

                        data.getGalleries((galleries) => {

                            gallery = galleries.find((retrievedGallery) => {
                                return retrievedGallery.name === sampleNewGallery.name;
                            });

                            expect(gallery.name).to.equal(sampleNewGallery.name);

                            done();

                        }, (error) => {

                            console.log('Error while getting galleries after posting gallery: ', error);
                            done();

                        });

                    }, (error) => {

                        console.log('Error while posting gallery: ', error);
                        done();

                    });
                }
            };

            for (let imagePath of images) {
                fileReader.readAsDataURL(new File(imagePath));
            }
        });
    });

    let performAssertions = (sampleNewGallery) => {

        it('should post gallery', (done) => {

        });

        it('should put gallery', (done) => {

            let updatedGallery = Object.assign({}, gallery);
            updatedGallery.addedImages = [];

            updatedGallery.addedImages.push(base64Encode(images[0]));

            data.putGallery(updatedGallery, () => {

                data.getGalleries((galleries) => {

                    let result = galleries.find((retrievedGallery) => {
                        return retrievedGallery.name === updatedGallery.name;
                    });

                    expect(result.images.length).to.equal(updatedGallery.images.length + updatedGallery.addedImages.length);

                    done();

                }, (error) => {

                    console.log('Error while getting galleries after putting gallery: ', error);
                    done();

                });

            }, (error) => {

                console.log('Error while putting gallery: ', error);
                done();

            });
        });

        it('should delete gallery', () => {

            data.deleteGallery(gallery, () => {
                done();
            }, (error) => {
                console.log('Error while deleting gallery: ', error);
            });
        });
    }
});