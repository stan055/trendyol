const fs = require('fs');
const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const parser = require('./parser/parser');
const selectors  = require('./parser/selectors');

const app = express();
app.use(express.json());

let page;

app.post('/api', async (req, res) => {

    if (req.body.type === 'start') {
        await apiStart(req.body.url, req.body.setting);
        const result = await parser.parseText(page, selectors.text, req.body.url);
        if (result)
            res.status(200).json({result: result});
        else 
            res.status(400).json({result: null});
    }


    if (req.body.type === 'scraping-urls') {
        const urls = await parser.scrapingUrls(page, req.body.url, selectors.url);
        if (urls) {
            res.status(200).json({result: urls});
        }
        else 
            res.status(400).json({result: null});
    }


    if (req.body.type === 'parsing-one-url') {
        if (!page) {
            await apiStart(req.body.url, req.body.setting);
        }
        const result = await parser.parseProduct(page, req.body.url);
        if (result) {
            if (result.error !== null) {
                fs.appendFile('./public/data.txt', JSON.stringify(result) + '\n', function (err) {
                    if (err) throw err;
                    console.log('Saved! of parsing-one-url');
                });
            }
            res.status(200).json({result: result});
        }
        else {
            res.status(400).json({result: null});
        }
    }

});



async function apiStart (_url, _setting) {
    page = await parser.configureBrowser(_setting);
    await page.goto(_url, { waitUntil: 'domcontentloaded' });

    const url = new URL(page.url());
    if (url.pathname === '/select-country') {
        await page.waitForTimeout(500);
        await page.click('.row a');
        await page.waitForTimeout(500);
    }

    fs.writeFile('./public/data.txt', `Start... ${new Date().toLocaleString()}\n`, function (err) {
        if (err) throw err;
        console.log('Saved! of start...');
    });
}



app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));


