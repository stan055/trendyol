btnStartList.addEventListener('click',  (e) => {
    let str = textArea.value;
    let urls = str.match(pattUrl);
    
    btnStopSwitch = false;
    tableRef.innerHTML = ''; // Clean table
    productCounter = 0;
    setResultHeader('Start work');

    if (urls) {
      fetch('/api', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: urls[0],
          type: 'start',
          setting: setting
        })
      })
      .then(response => response.json())
      .then(async data => {
        setResultHeader(data['result']);
        await scrapFromListUrls(urls);
        setResultHeader('Work is done...', false);
      })
      .catch((error) => {
        setResultHeader(error, false);
      });

    }
})

