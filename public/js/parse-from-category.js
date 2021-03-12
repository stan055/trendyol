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
        console.log("Response data: ", data);
        setResultHeader(data['result']);

        let url = inputUrl.value;
        let urlCount = searchParamPi(url);
        let response = true;

        while (response && !categoryBtnStopSwitch) {

          response = await parsing(url);

          urlCount++;
          url = setUrlNewPi(url, urlCount);
        }

      })
      .catch((error) => {
        resultHeader.innerHTML = `<p style="color: red;"> ${error} <p>`;
        
      });
});
