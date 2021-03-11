// const fs = require('fs');
const parseProduct = require('./parse-product');
const configureBrowser = require('./configure-browser');
const parseText = require('./parse-text');
const parseUrls = require('./parse-url');


exports.configureBrowser = configureBrowser.configureBrowser;
exports.parseUrls = parseUrls.parseUrls;
exports.parseText = parseText.parseText;
exports.parseProduct = parseProduct.parseProduct;


