var i18n =require('i18next');
import XHR from 'i18next-xhr-backend';
var path = require('path');
//let localesPoint = path.join(path.resolve('../'),'locales/index.js');

i18n.use(XHR).init({
    "debug": true,
    "lng": "vi",
    "fallbackLng": "vi",
    "ns": [
        "welcome"
    ],
    "defaultNS": "welcome",
    "backend": {
        "loadPath": "locales/{{lng}}/{{ns}}.json"
    }
}, (err, t) => {
    // initialized and ready to go!
    console.info('loaded....');
});

window.i18n = i18n;