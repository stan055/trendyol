// const fs = require('fs');
const puppeteer = require('puppeteer');


async function configureBrowser (url) {
    const browser = await puppeteer.launch({headless: true, slowMo: 100});
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForTimeout(1000);
    return page; 
}


async function parseWithSelectors (page, selectors) {
    const result = await page.evaluate((sel) => {
        let items = document.querySelectorAll(sel);
        const list = [...items];
        return list.map(item => item.href);
    }, selectors);
    
    return result;
}


exports.configureBrowser = configureBrowser;
exports.parseWithSelectors = parseWithSelectors;
