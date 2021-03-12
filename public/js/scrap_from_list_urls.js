async function scrapFromListUrls (urls, parrentUrl) {
    for (const url of urls) {
      if (!btnStopSwitch) {
        setResultHeader(url);
        const result = await scrapProductPage(url);
        if (resu) {
          console.log(result);
          createTableRow(result, parrentUrl);
        }
      }
    }
  }
  
