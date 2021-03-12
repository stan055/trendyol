// const fs = require('fs');
const parseProduct = require('./parse_product');
const configureBrowser = require('./configure_browser');
const parseText = require('./parse_text');
const scrapingUrls = require('./scraping_urls');

exports.configureBrowser = configureBrowser.configureBrowser;
exports.scrapingUrls = scrapingUrls.scrapingUrls;
exports.parseText = parseText.parseText;
exports.parseProduct = parseProduct.parseProduct;


