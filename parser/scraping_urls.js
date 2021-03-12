async function scrapingUrls (page, url, selectors) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);

    const result = await page.evaluate((sel) => {
        try {
            let items = document.querySelectorAll(sel);
            const list = [...items];
            return list.map(item => item.href);    
        } catch (error) {
            return null;
        }
    }, selectors);
    
    return result;
}


exports.scrapingUrls = scrapingUrls;
