var i18n = require('i18next');
var path = require('path');
var db = require('localforage');
var {EventEmitter} = require('fbemitter');
window.emitter = new EventEmitter();
var resBundle = require(
    "i18next-resource-store-loader!../assets/i18n/index.js"
);

db.getItem('lang').then((lang)=> {
    if (!lang) {
        lang = 'vi';
        db.setItem('lang', lang);
    }
    i18n.init({
        "debug": true,
        "lng": lang,
        "fallbackLng": lang,
        "ns": [
            "welcome",
            "step1",
            "step2",
            "step3",
            "step4",
            "thanks"
        ],
        "defaultNS": "welcome",
        "backend": {
            "loadPath": "locales/{{lng}}/{{ns}}.json"
        },
        resources: resBundle
    }, (err, t) => {
        // initialized and ready to go!
        window.i18n = i18n;
        window.emitter.emit('loadedLanguage', true);
    });
})


