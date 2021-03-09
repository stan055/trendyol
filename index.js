const fs = require('fs');
const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const parser = require('./parser');


const selectors = ".p-card-chldrn-cntnr a";

const app = express();
app.use(express.json());


app.post('/api', async (req, res) => {
    console.log(req.body.url);
    if (req.body.url) {
        const page = await parser.configureBrowser(req.body.url);
        const result = await parser.parseWithSelectors(page, selectors);
        res.status(200).json({result: result});
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