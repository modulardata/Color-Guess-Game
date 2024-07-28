const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const { DOMParser } = window;

// XML string to be parsed
const xmlStr = '<q id="a"><span id="b">hey!</span></q>';



// Parse the XML string into a DOM Document[^2^][2]
const doc = window.parseFromString(xmlStr, "text/xml");

// Check for parsing errors by looking for a parsererror element
const errorNode = doc.querySelector('error');

if (errorNode) {
    console.log("error while parsing");
} else {
    // Output the name of the root element (should be 'q')
    console.log(doc.documentElement.nodeName);
}
