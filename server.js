const fs = require('fs');
const express = require('express');
const path = require('path');
const parser = require('./parser/parser');
const apiStart = require('./parser/api_start');
const selectors  = require('./parser/selectors');

const app = express();
app.use(express.json());

let page;

app.post('/api', async (req, res) => {

    if (req.body.type === 'start') {
        page = await apiStart.start(page, req.body.url, req.body.setting);
        const result = await parser.scrapText(page, selectors.text, req.body.url);
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
            page = await apiStart.start(page, req.body.url, req.body.setting);
        }
        const result = await parser.parseProduct(page, req.body.url);
        if (result) {
            if (result.error === null) {
                let xml = parser.toXml(result);
                fs.appendFile('./public/data.xml', xml + '\n', 'utf8', function (err) {
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




app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));


