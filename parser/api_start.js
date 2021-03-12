const parser = require('./parser');
const fs = require('fs');

async function apiStart (page, _url, _setting) {
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

    return page;
}


exports.start = apiStart;
