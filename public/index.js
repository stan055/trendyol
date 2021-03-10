const btnStart = document.getElementById('btnStart');
const inputUrl = document.getElementById('inputUrl');
const resultHeader = document.getElementById('resultHeader');
const tableRef = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
const loader = document.getElementById('loader');
var setting = { display: false };



btnStart.addEventListener('click', () => {
    event.preventDefault();

    resultHeader.innerHTML = inputUrl.value;

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
        console.log("Response data: ", data);
        setResultHeader(data['result']);

        let url = inputUrl.value;
        let urlCount = parseUrlsPi(url);
        let response = true;
        response = await parsing(url);

        // while (response) {

        //   response = await parsing(url);

        //   urlCount++;
        //   url = setUrlNewPi(url, urlCount);
        // }

      })
      .catch((error) => {
        resultHeader.innerHTML = `<p style="color: red;"> ${error} <p>`;
        
      });
});


function setUrlNewPi (url, pi) {
  const newUrl = new URL(url);
  const searchParams = newUrl.searchParams;
  searchParams.set('pi', pi);
  return newUrl.href;
}


function parseUrlsPi (url) {
  const searchParams = new URL(url).searchParams;
  const pi = searchParams.get("pi") ?? 1;
  return parseInt(pi);
}


function setResultHeader (text) {
  resultHeader.innerHTML = `<p style="color: grey;"> ${text} </p>`;
  loader.classList.add("loader");
}

