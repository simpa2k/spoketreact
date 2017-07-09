import Service from "./Service";
import Endpoint from '../../../src/data/endpoint/Endpoint';

class EmbeddedItemsService extends Service {

    constructor() {

        super(new Endpoint('embeddedItems', true, true, true));

        this.bindEmbeddedItemFunctions();
        this.bindVideoFunctions();
        this.bindSoundFunctions();

    }

    /*
     * Bindings
     */

    bindEmbeddedItemFunctions() {

        this.getEmbeddedItems = this.getEmbeddedItems.bind(this);
        this.putEmbeddedItem = this.putEmbeddedItem.bind(this);
        this.postEmbeddedItem = this.postEmbeddedItem.bind(this);
        this.deleteEmbeddedItem = this.deleteEmbeddedItem.bind(this);

    }

    bindVideoFunctions() {

        this.getVideos = this.getVideos.bind(this);
        this.putVideo = this.putVideo.bind(this);
        this.postVideo = this.postVideo.bind(this);

    }

    bindSoundFunctions() {
        this.getSounds = this.getSounds.bind(this);
    }

    /*
     * General
     */

    getEmbeddedItems(successCallback, errorCallback) {
        this.endpoint.getRequest(successCallback, errorCallback);
    }

    putEmbeddedItem(embeddedItem, successCallback, errorCallback) {
        this.endpoint.putRequest(embeddedItem, successCallback, errorCallback);
    }

    postEmbeddedItem(embeddedItem, successCallback, errorCallback) {
        this.endpoint.postRequest(embeddedItem, successCallback, errorCallback);
    }

    deleteEmbeddedItem(embeddedItem, successCallback, errorCallback) {
        this.endpoint.deleteRequest(embeddedItem, successCallback, errorCallback);
    }

    setType(embeddedItem, type) {

        if (typeof(embeddedItem.type) === 'undefined' || embeddedItem.type !== type) {
            embeddedItem.type = type;
        }
    }

    /*
     * Videos
     */

    modifyVideosRepository(video, modificationFunction, successCallback, errorCallback) {

        this.setType(video, 'video');
        modificationFunction(video, successCallback, errorCallback);

    }

    getVideos(successCallback, errorCallback) {

        this.endpoint.getRequest((fulfilled) => {

            successCallback(fulfilled.map((video) => {

                video.externalId = video.src.split('/').pop();
                return video;

            }));

        }, errorCallback, null, {
            type: 'video'
        });
    }

    putVideo(video, successCallback, errorCallback) {
        this.modifyVideosRepository(video, this.endpoint.putRequest, successCallback, errorCallback);
    }

    postVideo(video, successCallback, errorCallback) {
        this.modifyVideosRepository(video, this.endpoint.postRequest, successCallback, errorCallback);
    }

    /*
     * Sounds
     */

    getSounds(successCallback, errorCallback) {

        this.endpoint.getRequest((fulfilled) => {

            successCallback(fulfilled.map((sound) => {

                sound.externalId = sound.src;
                return sound;

            }));
        }, errorCallback, null, {
            type: 'sound'
        });
    }
}

export default EmbeddedItemsService;