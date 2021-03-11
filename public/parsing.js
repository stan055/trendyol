let productCounter = 0;

async function parsing (url) {
  const result = await fetch('/api', {
      method: 'post',
      headers: { 'Content-Type': 'application/json',},
      body: JSON.stringify({
        url: url,
        type: 'parsing'
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.result.forEach(element => {
        createRow(element);
      });

      return true;      
    })
    .catch((error) => {
      resultHeader.innerHTML = `<p style="color: red;"> ${error} <p>`;
      return false
    });

    return result;
}


