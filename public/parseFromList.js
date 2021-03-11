const btnStartList = document.querySelector('#btnStartList');
const textArea = document.querySelector('#inputUrlList');

const pattUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

btnStartList.addEventListener('click',  (e) => {
    let str = textArea.value;
    let urls = str.match(pattUrl);

    if (urls) {
        urls.forEach(async (element) => {
            setResultHeader(element);

            await parsingOneUrl(element);
        });
    }
})



async function parsingOneUrl (url) {
  const result = await fetch('/api', {
      method: 'post',
      headers: { 'Content-Type': 'application/json',},
      body: JSON.stringify({
        url: url,
        type: 'parsing-one-url'
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      createRow(data.result);
      return true;      
    })
    .catch((error) => {
      resultHeader.innerHTML = `<p style="color: red;"> ${error} <p>`;
      return false
    });

    return result;
}