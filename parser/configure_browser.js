const puppeteer = require('puppeteer');

async function configureBrowser (setting) {
    const browser = await puppeteer.launch({
            headless: !setting.display, 
            slowMo: 100, 
            devtools: false
        });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
    return page; 
}

exports.configureBrowser = configureBrowser;
