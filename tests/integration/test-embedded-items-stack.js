import Data from "../../src/data/Data";
import {getRequest, putRequest, postRequest, deleteRequest} from "../../src/data/requests/requests";

const expect = require('chai').expect;
const sinon = require('sinon');

const helpers = require('../helpers/helpers');

describe('Embeddeditems Stack', () => {

    let data = new Data();

    before((done) => {

        helpers.login(() => {

            done();

        }, (error) => {

            console.error('Could not login. Error: ', error);
            done();

        });
    });


    describe('Get embeddeditems', () => {

        it('should get videos', (done) => {


            data.getVideos((videos) => {

                expect(videos).to.be.an('array');

                for (let video of videos) {

                    expect(video).to.include.own.property('id');
                    expect(video).to.include.own.property('type');
                    expect(video).to.include.own.property('src');
                    expect(video).to.include.own.property('externalId');

                    expect(video.type).to.equal('video');

                }

                done();

            }, (error) => {

                console.error(error);
                done();

            });
        });

        it('should get sounds', (done) => {

            data.getSounds((sounds) => {

                expect(sounds).to.be.an('array');

                for (let sound of sounds) {

                    expect(sound).to.include.own.property('id');
                    expect(sound).to.include.own.property('type');
                    expect(sound).to.include.own.property('src');
                    expect(sound).to.include.own.property('externalId');

                    expect(sound.type).to.equal('sound');

                }

                done();

            }, (error) => {

                console.error(error);
                done();

            });
        });
    });

    describe('Modify embeddeditems', () => {

        describe('Modify video', () => {

            let video = {
                type: 'video',
                src: 'https://www.youtube.com/embed/LtQOQwGXios?list=FL99DRRfqzzCbL5a3oHbqS2Q'
            };

            it('should post video', (done) => {

                data.postVideo(video, () => {

                    data.getVideos((videos) => {

                        video = videos.find((retrievedVideo) => {
                            return retrievedVideo.src === video.src;
                        });

                        expect(video.id).to.not.equal(undefined);

                        done();

                    }, (error) => {

                        console.error('Error while getting videos after posting video: ', error);
                        done();

                    });
                }, (error) => {

                    console.error('Error while posting video: ', error);
                    done();

                });
            });

            it('should put video', (done) => {

                let updatedVideo = Object.assign({}, video);
                updatedVideo.src = 'https://www.youtube.com/embed/5tQt8zC0DnQ?list=FL99DRRfqzzCbL5a3oHbqS2Q';

                delete updatedVideo.externalId;

                data.putVideo(updatedVideo, () => {

                    data.getVideos((videos) => {

                        let result = videos.find((retrievedVideo) => {
                            return retrievedVideo.id === updatedVideo.id;
                        });

                        expect(result.src).to.equal(updatedVideo.src);

                        done();

                    }, (error) => {

                        console.error('Error while getting video after putting video: ', error);
                        done();

                    });
                }, (error) => {

                    console.error('Error while putting video: ', error);
                    done();

                });
            });

            it('should delete video', (done) => {

                data.deleteEmbeddedItem(video, () => {
                    done();
                }, (error) => {

                    console.error('Error while deleting video: ', error);
                    done();

                });
            });
        });

        describe('Modify sound', () => {

            let sound = {
                type: 'sound',
                src: 'https%3A//api.soundcloud.com/tracks/83119585'
            };

            it('should post sound', (done) => {

                data.postEmbeddedItem(sound, () => {

                    data.getSounds((sounds) => {

                        sound = sounds.find((retrievedSound) => {
                            return retrievedSound.src === sound.src;
                        });

                        expect(sound.id).to.not.equal(undefined);

                        done();

                    }, (error) => {

                        console.error('Error while getting sounds after posting sound: ', error);
                        done();

                    });
                }, (error) => {

                    console.error('Error while posting sound: ', error);
                    done();

                });
            });

            it('should put sound', (done) => {

                let updatedSound = Object.assign({}, sound);
                updatedSound.src = 'https%3A//api.soundcloud.com/tracks/83959590';

                delete updatedSound.externalId;

                data.putEmbeddedItem(updatedSound, () => {

                    data.getSounds((sounds) => {

                        let result = sounds.find((retrievedSound) => {
                            return retrievedSound.id === updatedSound.id;
                        });

                        expect(result.src).to.equal(updatedSound.src);

                        done();

                    }, (error) => {

                        console.error('Error while getting sounds after putting sound: ', error);
                        done();

                    });
                }, (error) => {

                    console.error('Error while putting sound: ', error);

                });
            });

            it('should delete sound', (done) => {

                data.deleteEmbeddedItem(sound, () => {
                    done();
                }, (error) => {

                    console.error('Error while deleting sound: ', error);
                    done();

                });
            });
        });
    });
});