
function createTableRow (element, parrentUrl = '') {
  let newRow = tableRef.insertRow(0);
  let elementUrl = element.url ?? 'undefined';
  
  try {
    let attributesStr = element.attributes.map(e => {
      atrStr = ' ' + e.key.name + ': ' + e.value.name;
      return atrStr;
    }).toString();

    let size = element.size.map(e => {
      sizeStr = e.value + ' (' + 'stock:' + e.stock + ') ';
      return sizeStr;
    }).toString();

    newRow.innerHTML = 
      `<tr>
        <th scope="row">${productCounter++}</th>
        <td>${element.name}</td>
        <td><a href="${elementUrl}">${elementUrl}</a></td>
        <td>${element.brand}</td>
        <td>${element.code}<br>${element.id}</td>
        <td>
          originalPrice: ${element.price.originalPrice.text}, 
          <br>
          discountedPrice: ${element.price.discountedPrice.text}
        </td>
        <td>
          ${size}
        </td>
        <td>${attributesStr}</td>
        <td>${element.time}</td>
        <td><a href="${parrentUrl}">${parrentUrl}</a></td>
      </tr>`;
  } catch (error) {
    console.log(error);
    setResultHeader(resultHeader);
    newRow.innerHTML = 
    `<tr>
      <th scope="row">#</th>
      <td>undefined</td>
      <td>${elementUrl}</td>
      <td>undefined</td>
      <td>undefined</td>
      <td>undefined</td>
      <td>undefined</td>
      <td>undefined</td>
      <td>undefined</td>
      <td>${parrentUrl}</td>
    </tr>`;
  }
    // Delete row if length > 50
    if (tableRef.rows.length > 50) {
      tableRef.deleteRow(tableRef.rows.length - 1);
    }
  }