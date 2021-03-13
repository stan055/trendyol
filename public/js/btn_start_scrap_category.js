btnStart.addEventListener('click', () => {

    resultHeader.innerHTML = inputUrl.value;
    btnStopSwitch = false;
    tableRef.innerHTML = ''; //Clean table
    productCounter = 0;
    setResultHeader('Start work');

    fetch('/api', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: inputUrl.value,
          type: 'start',
          setting: setting
        })
      })
      .then(response => response.json())
      .then(async data => {
        setResultHeader(data['result']);

        let categoryUrl = inputUrl.value;
        let urlCount = searchParamPi(categoryUrl);
        let urls;
        let resultHeader = "Work is done...";
        let errorCount = 3; // Stop work if count = 0

        while (!btnStopSwitch) {

          urls = await scrapCategoryPage(categoryUrl);

          if (urls['result'].length !== 0 && urls['result'] !== null) {
            await scrapFromListUrls(urls['result'], categoryUrl);
          } else {
            setTimeout(function(){ 
              resultHeader = `${categoryUrl} Failed!!!`; 
              errorCount--;
              btnStopSwitch = errorCount === 0 ? !btnStopSwitch : btnStopSwitch;
            }, 3000);
            
          }
          
          urlCount++;
          categoryUrl = setUrlNewPi(categoryUrl, urlCount);
        }
        setResultHeader(resultHeader, false);
      })
      .catch((error) => {
        setResultHeader(error, false);
      });
});
