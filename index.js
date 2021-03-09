// const fs = require('fs');
const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const parser = require('./parser');


const selectorsUrl = ".p-card-chldrn-cntnr a";
const selectorsText = ".srch-ttl-cntnr-wrppr .dscrptn";
const selectorsProduct = {
    name: 'h1',
    color: '.item-value', // last item
    material: '.item-value',  // fifth element
    price: 'span.prc-slg',
    disprice: 'span.prc-org',
    size: '.pr-in-at-sp'
};

const app = express();
app.use(express.json());

let page;

app.post('/api', async (req, res) => {
    if (req.body.type === 'start') {
        page = await parser.configureBrowser();
        await page.waitForTimeout(300);
        await page.goto('https://en.trendyol.com/select-country');
        await page.waitForTimeout(300);
        await page.click('.row a');

        const result = await parser.parseText(page, req.body.url, selectorsText);
        if (result)
            res.status(200).json({result: result});
        else 
            res.status(400).json({result: null});
        
    }

    if (req.body.type === 'parsing') {
        const urls = await parser.parseUrls(page, req.body.url, selectorsUrl);
        if (urls) {
            let result = [];
            
            for(let i = 0; i < urls.length - 22; i++) {
                result[i] = await parser.parseProduct(page, urls[i], selectorsProduct);
                console.log(result[i]);
            }
        
            
            res.status(200).json({result: result});
        }
        else 
            res.status(400).json({result: null});
    }
});



app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));















// const url = 'https://www.trendyol.com/trendyolmilla-x-b101476';
// const url = 'https://www.example.com';


// async function configureBrowser () {
//     const browser = await puppeteer.launch({slowMo: 100});
//     const page = await browser.newPage();
//     await page.goto(url);
//     await page.waitForTimeout(5000);

//     return page; 
// }


// async function dimensions (page) {
//     const dimensions = await page.evaluate(() => {
//         let headingFromWed = document.querySelectorAll(".p-card-chldrn-cntnr a");
//         const headingList = [...headingFromWed];
//         return headingList.map(h => h.href);
//     });
    
//     return dimensions;
// }

// async function start () {
//     const page = await configureBrowser();

//     const result = await dimensions(page);
//     console.log('Dimensions:', result);
// }

// start();

// get text for element
// const text = await page.$eval('h1', element => element.textContent);