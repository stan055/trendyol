async function scrapFromListUrls (urls, parrentUrl) {
    for (const url of urls) {
      if (!btnStopSwitch) {
        setResultHeader(url);
        const result = await scrapProductPage(url);
        if (result) {
          createTableRow(result, parrentUrl);
        }
      }
    }
  }
  
