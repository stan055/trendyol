async function scrapProductPage (url) {
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