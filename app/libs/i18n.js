var i18n =require('i18next');
var path = require('path');

var resBundle = require(
    "i18next-resource-store-loader!../assets/i18n/index.js"
);


i18n.init({
	"debug": true,
	"lng": "vi",
	"fallbackLng": "vi",
	"ns": [
		"welcome"
	],
	"defaultNS": "welcome",
	"backend": {
		"loadPath": "locales/{{lng}}/{{ns}}.json"
	},
	resources: resBundle
},(err, t) => {
	// initialized and ready to go!
	console.info('loaded....',t('welcome:h4'));
});

window.i18n = i18n;