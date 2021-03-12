btnStart.addEventListener('click', () => {
    event.preventDefault();

    resultHeader.innerHTML = inputUrl.value;
    categoryBtnStopSwitch = false;
    
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

        while (!categoryBtnStopSwitch) {

          urls = await scrapCategoryPage(url);

          if (urls['result'].length !== 0 && urls['result'] !== null) {
            console.log()
            await scrapFromListUrls(urls['result']);
          } else {
            console.log('urls failed');
            categoryBtnStopSwitch = !categoryBtnStopSwitch;
          }
          
          categoryBtnStopSwitch = !categoryBtnStopSwitch;
          urlCount++;
          url = setUrlNewPi(url, urlCount);
        }

      })
      .catch((error) => {
        resultHeader.innerHTML = `<p style="color: red;"> ${error} <p>`;
        
      });
});
