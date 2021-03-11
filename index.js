// const fs = require('fs');
const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const parser = require('./parser/parser');
const selectors  = require('./selectors');

const app = express();
app.use(express.json());

let page;

app.post('/api', async (req, res) => {

    if (req.body.type === 'start') {
        const result = await apiStart(req.body.url, req.body.setting, selectors.text)
        if (result)
            res.status(200).json({result: result});
        else 
            res.status(400).json({result: null});
    }


    if (req.body.type === 'parsing') {
        const urls = await parser.parseUrls(page, selectors.url);
        if (urls) {
            let result = await apiParsing(urls, );
            res.status(200).json({result: result});
        }
        else 
            res.status(400).json({result: null});
    }

});



async function apiStart (_url, _setting, _selectors) {
    page = await parser.configureBrowser(_setting);
    await page.goto(_url, { waitUntil: 'domcontentloaded' });

    const url = new URL(page.url());
    if (url.pathname === '/select-country') {
        await page.waitForTimeout(500);
        await page.click('.row a');
        await page.waitForTimeout(500);
        await page.goto(_url, { waitUntil: 'domcontentloaded' });
    }

    return parser.parseText(page, _selectors);
}



async function apiParsing (_urls, _selectors) {
    let result = [];

    for(let i = 0; i < _urls.length - 23; i++) {
        result[i] = await parser.parseProduct(page, _urls[i], _selectors);
        console.log(result[i]);
    }

    return result;
}


app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));


