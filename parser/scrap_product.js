async function parseProduct (page, url) {
    await page.waitForTimeout(600);
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    const result = await page.evaluate((url) => {
        const scriptSearch = 'PRODUCT_DETAIL_APP_INITIAL_STATE';
        const scriptPatt = /{\s*"product"[\s\S]*"}}/;
        const scripts = document.querySelectorAll('script[type="application/javascript"]');
        
        let resultProduct = { error: 'error', url: url };

        let scriptProductText;
        scripts.forEach(script => {
            let str = script.innerText;
            if (str.search(scriptSearch) != -1) {
                scriptProductText = str;                
            };
            
        });
        
        try {
            if (scriptProductText) {
                const initialJson = scriptProductText.match(scriptPatt);
                const initialObj = JSON.parse(initialJson);
                const product = initialObj.product;
                
                const price = {
                        originalPrice: product.price.originalPrice.value ?? '',
                        sellingPrice: product.price.sellingPrice.value ?? '',
                        discountedPrice: product.price.discountedPrice.value ?? '',
                        currency: product.price.currency ?? ''
                    }; 

                let variants = product.variants.map(e => {
                    return {
                        value: e.attributeValue,
                        stock: e.stock
                    };
                });
                    

                resultProduct = {
                    name: product.name ?? '',
                    code: product.productCode ?? '',
                    id: product.id ?? '',
                    attributes: product.attributes ?? '',
                    brand: product.brand.name ?? '',
                    price: price ?? '',
                    size: variants ?? '',
                    url: url ?? '',
                    time: new Date().toLocaleString(),
                    error: null
                }  
            }  
        } catch (error) {
            resultProduct = {
                error: error
            };
        }

        return resultProduct;
    }, url);
    
    return result;
}

exports.parseProduct = parseProduct;
