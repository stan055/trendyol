async function parseUrls (page, url, selectors) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);

    const result = await page.evaluate((sel) => {
        let items = document.querySelectorAll(sel);
        const list = [...items];
        return list.map(item => item.href);
    }, selectors);
    
    return result;
}


exports.parseUrls = parseUrls;
