async function scrapFromListUrls (urls) {
    for (const url of urls) {
      if (!listBtnStopSwitch) {
        setResultHeader(url);
        const result = await scrapProductPage(url);
        createTableRow(result);
      }
    }
  }
  
