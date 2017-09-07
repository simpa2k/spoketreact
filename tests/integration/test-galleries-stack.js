import Data from "../../src/data/Data";
import {getRequest, putRequest, postRequest, deleteRequest} from "../../src/data/requests/requests";

const expect = require('chai').expect;
const sinon = require('sinon');

const fs = require('fs');

const FileAPI = require('file-api');
const File = FileAPI.File;
const FileReader = FileAPI.FileReader;

const helpers = require('../helpers/helpers');
const assertProvidesCorrectArgumentsToRequestFunction = helpers.assertProvidesCorrectArgumentsToRequestFunction;

describe('Galleries Stack', () => {

    let data = new Data();

    /*let base64Encode = (file) => {

        let bitmap = fs.readFileSync(file);
        return new Buffer(bitmap).toString('base64');

    };

    let encodeFiles = (files) => {

        let encodedFiles = [];

        for (let file of files) {
            encodedFiles.push(base64Encode(file));
        }

        return encodedFiles;

    };*/

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

            console.error('Could not login. Error: ', error);
            done();

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
        let images = ['/home/simon/www/spoketreact/tests/unit/data/services/galleriesService/sampleImage.jpg',
                      '/home/simon/www/spoketreact/tests/unit/data/services/galleriesService/sampleImage.jpg',
                      '/home/simon/www/spoketreact/tests/unit/data/services/galleriesService/sampleImage.jpg'];

        let SAMPLE_NEW_GALLERY = {
            name: 'Test gallery',
            addedImages: []
        };

        let fileReader = new FileReader();

        fileReader.onload = (event) => {

            SAMPLE_NEW_GALLERY.addedImages.push(event.target.result);
            console.log(SAMPLE_NEW_GALLERY.addedImages.length);

        };

        fileReader.readAsDataURL(new File(images[0]));
        fileReader.readAsDataURL(new File(images[1]));
        fileReader.readAsDataURL(new File(images[2]));

        /*it('should post gallery', (done) => {

            data.postGallery(SAMPLE_NEW_GALLERY, () => {

                data.getGalleries((galleries) => {

                    gallery = galleries.find((retrievedGallery) => {
                        return retrievedGallery.name === SAMPLE_NEW_GALLERY.name;
                    });

                    expect(gallery.name).to.equal(SAMPLE_NEW_GALLERY.name);

                    done();

                }, (error) => {

                    console.log('Error while getting galleries after posting gallery: ', error);
                    done();

                });

            }, (error) => {

                console.log('Error while posting gallery: ', error);
                done();

            });
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
        });*/
    });
});