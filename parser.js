// const fs = require('fs');
const puppeteer = require('puppeteer');


async function configureBrowser (url) {
    const browser = await puppeteer.launch({headless: true, slowMo: 100, devtools: false});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
    return page; 
}

async function parseText (page, url, selectors) {
    await page.goto(url);

    const result = await page.evaluate((sel) => {
        let item = document.querySelector(sel);
        return item.innerText;
    }, selectors);
    
    return result;
}


async function parseUrls (page, url, selectors) {
    await page.goto(url);

    const result = await page.evaluate((sel) => {
        let items = document.querySelectorAll(sel);
        const list = [...items];
        return list.map(item => item.href);
    }, selectors);
    
    return result;
}


async function parseProduct (page, url, selectorsProduct) {
    await page.waitForTimeout(300);
    await page.goto(url);


    const result = await page.evaluate((sel, url) => {
        let product = {};
        
        try {
            const colorNodes = document.querySelectorAll(sel['color']);
            const sizeNodes = document.querySelectorAll("div.sp-itm:not(.so)");
            const sizeList = [...sizeNodes];
            const sizeText = sizeList.map(size => size.innerText).toString();

            product = {
                name: document.querySelector(sel['name']).innerText,
                color: document.querySelectorAll(sel['color'])[colorNodes.length - 1] .innerText,
                material: document.querySelectorAll(sel['material'])[colorNodes.length - 4].innerText,
                price: document.querySelector(sel['price']).innerText,
                disprice: document.querySelector(sel['disprice']).innerText,
                size: sizeText,
                url: url
            }    
        } catch (error) {
            product = {
                name: '', color: '', material: '', price: '', disprice: '', size: '', url: url
            };
            console.log(error);
        }

        return product;
    }, selectorsProduct, url);
    
    return result;
}



exports.configureBrowser = configureBrowser;
exports.parseUrls = parseUrls;
exports.parseText = parseText;
exports.parseProduct = parseProduct;

