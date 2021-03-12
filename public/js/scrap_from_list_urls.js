async function scrapFromListUrls (urls) {
    for (const url of urls) {
      if (!btnStopSwitch) {
        setResultHeader(url);
        const result = await scrapProductPage(url);
        createTableRow(result);
      }
    }
  }
  
