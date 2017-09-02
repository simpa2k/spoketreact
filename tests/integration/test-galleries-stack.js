import Data from "../../src/data/Data";
import {getRequest, putRequest, postRequest, deleteRequest} from "../../src/data/requests/requests";

const expect = require('chai').expect;
const sinon = require('sinon');

const helpers = require('../helpers/helpers');
const assertProvidesCorrectArgumentsToRequestFunction = helpers.assertProvidesCorrectArgumentsToRequestFunction;

describe('Galleries Stack', () => {

    let data = new Data();

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

        it('should post gallery', (done) => {
            done();
        });

        it('should put gallery', () => {

            let updatedGallery = Object.assign({}, gallery);

        });

        it('should delete gallery', () => {

        });
    });
});