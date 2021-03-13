const parseProduct = require('./parse_product');
const configureBrowser = require('./configure_browser');
const parseText = require('./parse_text');
const scrapingUrls = require('./scraping_urls');
const toXml = require('./product_to_xml');


exports.configureBrowser = configureBrowser.configureBrowser;
exports.scrapingUrls = scrapingUrls.scrapingUrls;
exports.parseText = parseText.parseText;
exports.parseProduct = parseProduct.parseProduct;
exports.toXml = toXml.toXml;



