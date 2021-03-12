async function parseText (page, selectors, url) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(200);

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


exports.parseText = parseText;
