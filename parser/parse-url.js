async function parseUrls (page, selectors) {

    const result = await page.evaluate((sel) => {
        let items = document.querySelectorAll(sel);
        const list = [...items];
        return list.map(item => item.href);
    }, selectors);
    
    return result;
}


exports.parseUrls = parseUrls;
