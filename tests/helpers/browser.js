let sampleUsername = require('../../src/secrets').sampleUsername;
let sampleToken = require('../../src/secrets').sampleToken;

// From https://semaphoreci.com/community/tutorials/testing-react-components-with-enzyme-and-mocha
// With minor modifications.
require('babel-register')();

let jsdom = require('jsdom/lib/old-api.js').jsdom;

let exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

/*
 * jsdom doesn't support localStorage. The following solution was taken from:
 * https://stackoverflow.com/questions/38952021/how-to-unit-test-localstorage-using-sinon
 * With minor modifications.
 */

if (!global.window.localStorage) {

    let credentials = {
        username: sampleUsername,
        authToken: sampleToken
    };

    global.window.localStorage = {
        getItem(key) { return credentials[key]; },
        setItem() {}
    };
}

global.navigator = {
    userAgent: 'node.js'
};

documentRef = document;