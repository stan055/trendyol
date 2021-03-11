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
      <td style="width: 230px;">${element.name}</td>
      <td style="width: 300px;"><a href="${element.url}">${element.url}</a></td>
      <td style="width: 100px;">${element.brand}</td>
      <td style="width: 100px;">${element.code}</td>
      <td style="width: 80px;">${element.id}</td>
      <td style="width: 170px;">
        originalPrice: ${element.price.originalPrice.text}, 
        <br>
        discountedPrice: ${element.price.discountedPrice.text}
      </td>
      <td style="width: 170px;">
        ${JSON.stringify(element.size)}
      </td>
      <td style="width: 80px;">${element.time}</td>
    </tr>`;
}