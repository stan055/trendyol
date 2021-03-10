// const fs = require('fs');
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


async function parseText (page, selectors) {
    await page.waitForTimeout(200);
    await page.waitForSelector(selectors);

    const result = await page.evaluate((sel) => {
        let item = document.querySelector(sel);
        if (item) {
            const result = item.innerText ?? "Failed to parse header!";
            return result;
        }
        return "Failed to parse header!";
    }, selectors);
    
    return result;
}


async function parseUrls (page, selectors) {

    const result = await page.evaluate((sel) => {
        let items = document.querySelectorAll(sel);
        const list = [...items];
        return list.map(item => item.href);
    }, selectors);
    
    return result;
}


async function parseProduct (page, url, selectorsProduct) {
    await page.waitForTimeout(500);
    await page.waitForSelector('script[type="application/javascript"]');
    await page.goto(url);


    const result = await page.evaluate((sel, url) => {
        let resultProduct = { 
            name: '',
            code: '', 
            id: 0,
            color: '', 
            brand: '',
            material: '', 
            price: '', 
            disprice: '', 
            size: '', 
            url: url ,
            time: 'test'
        };
        const initialScriptPatt = /{\s*"product"[\s\S]*"}}/;

        try {
            const scripts = document.querySelectorAll('script[type="application/javascript"]');
            if (scripts[4]) {
                const initialScriptText = scripts[4].innerText;
                const initialJson = initialScriptText.match(initialScriptPatt);
                const initialObj = JSON.parse(initialJson);
                const product = initialObj.product;
                
                const price = {
                        originalPrice: product.price.originalPrice,
                        sellingPrice: product.price.sellingPrice,
                        discountedPrice: product.price.discountedPrice,
                    } 

                const variants = product.variants.map(item => {
                    return {
                        attributeValue: item.attributeValue,
                        stock: item.stock,
                    }
                });

                resultProduct = {
                    name: product.name ?? '',
                    code: product.productCode ?? '',
                    id: product.id ?? '',
                    color: product.color ?? '',
                    brand: product.brand.name ?? '',
                    material: product.attributes[1].value.name ?? '',
                    price: price ?? '',
                    size: variants ?? '',
                    url: url ?? '',
                    time: new Date().toLocaleString(),
                    test: ''
                }  
            }  
        } catch (error) {
            console.log(error);
        }

        return resultProduct;

    }, selectorsProduct, url);
    
    return result;
}



exports.configureBrowser = configureBrowser;
exports.parseUrls = parseUrls;
exports.parseText = parseText;
exports.parseProduct = parseProduct;

