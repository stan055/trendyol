const btnStartList = document.querySelector('#btnStartList');
const textArea = document.querySelector('#inputUrlList');

const pattUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

btnStartList.addEventListener('click',  (e) => {
    let str = textArea.value;
    let urls = str.match(pattUrl);
    console.log(urls);

    if (urls) {
      parsingListUrl(urls);
    }
})

async function parsingListUrl (urls) {
  for (const url of urls) {
    setResultHeader(url);
    const result = await parsingOneUrl(url);
    console.log(result);
    createRow(result);
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