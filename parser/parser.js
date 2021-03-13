const parseProduct = require('./scrap_product');
const configureBrowser = require('./configure_browser');
const scrapText = require('./scrap_text');
const scrapingUrls = require('./scraping_urls');
const toXml = require('./to_xml');


exports.configureBrowser = configureBrowser.configureBrowser;
exports.scrapingUrls = scrapingUrls.scrapingUrls;
exports.scrapText = scrapText.scrapText;
exports.parseProduct = parseProduct.parseProduct;
exports.toXml = toXml.toXml;



