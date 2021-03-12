
btnStartList.addEventListener('click',  (e) => {
    let str = textArea.value;
    let urls = str.match(pattUrl);
    listBtnStopSwitch = false;

    if (urls) {
      parsingListUrl(urls);
    }
})

async function parsingListUrl (urls) {
  for (const url of urls) {
    if (!listBtnStopSwitch) {
      setResultHeader(url);
      const result = await parsingOneUrl(url);
      console.log(result);
      createTableRow(result);
    }
  }
}

async function parsingOneUrl (url) {
  const result = await fetch('/api', {
      method: 'post',
      headers: { 'Content-Type': 'application/json',},
      body: JSON.stringify({
        url: url,
        type: 'parsing-one-url',
        setting: setting
      })
    })
    .then(response => response.json())
    .then(data => {
      return data.result;      
    })
    .catch((error) => {
      resultHeader.innerHTML = `<p style="color: red;"> ${error} <p>`;
      return false
    });

    return result;
}