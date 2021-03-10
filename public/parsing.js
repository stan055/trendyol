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


function createRow (element) {
  let newRow = tableRef.insertRow(0);
  newRow.innerHTML = 
    `<tr>
      <th scope="row">${productCounter++}</th>
      <td>${element.name}</td>
      <td><a href="${element.url}">${element.url}</a></td>
      <td>${element.price}</td>
      <td>${element.disprice}</td>
      <td>${element.material}</td>
      <td>${element.color}</td>
      <td>${element.size}</td>
      <td>${element.time}</td>
    </tr>`;
}