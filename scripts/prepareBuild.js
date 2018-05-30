const fs = require('fs');
const jsdom = require('jsdom');
const pretty = require('pretty');

// get generated index file content
const html = fs.readFileSync('./cordova/www/index.html', 'utf8');
const dom = new jsdom.JSDOM(html);

// store window document
const doc = dom.window.document;

// change app base location
doc.querySelector('base').href = './';

// create cordova script tag
const cordovaScript = doc.createElement('script');
cordovaScript.type = 'text/javascript';
cordovaScript.src = 'cordova.js';

// tag first angular script tag
const angularScripts = doc.body.querySelectorAll('script');

// put cordova script tag in front of the angular script tags
doc.body.insertBefore(cordovaScript, angularScripts[0]);

// store modified html
const output = dom.serialize();
const prettyOutput = pretty(output, { ocd: true });

// save modified html in file
fs.writeFileSync('./cordova/www/index.html', prettyOutput);
