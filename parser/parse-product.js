
async function parseProduct (page, url, selectorsProduct) {


    await page.waitForTimeout(500);
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const result = await page.evaluate((sel, url) => {
        const scriptSearch = 'PRODUCT_DETAIL_APP_INITIAL_STATE';
        const scriptPatt = /{\s*"product"[\s\S]*"}}/;
        const scripts = document.querySelectorAll('script[type="application/javascript"]');
        

        let resultProduct = {};

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
                        originalPrice: product.price.originalPrice ?? '',
                        sellingPrice: product.price.sellingPrice ?? '',
                        discountedPrice: product.price.discountedPrice ?? '',
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
                }  
            }  
        } catch (error) {
            console.log(error);
        }

        return resultProduct;

    }, selectorsProduct, url);
    
    return result;
}

exports.parseProduct = parseProduct;
