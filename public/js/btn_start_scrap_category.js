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

        let url = inputUrl.value;
        let urlCount = searchParamPi(url);
        let urls;
        let resultHeader = "Work is done...";

        while (!btnStopSwitch) {

          urls = await scrapCategoryPage(url);

          if (urls['result'].length !== 0 && urls['result'] !== null) {
            console.log()
            await scrapFromListUrls(urls['result']);
          } else {
            resultHeader = 'urls failed';
            btnStopSwitch = !btnStopSwitch;
          }
          
          urlCount++;
          url = setUrlNewPi(url, urlCount);
        }
        setResultHeader(resultHeader, false);
      })
      .catch((error) => {
        setResultHeader(error, false);
      });
});
