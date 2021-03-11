const btnStart = document.getElementById('btnStart');
const inputUrl = document.getElementById('inputUrl');
const resultHeader = document.getElementById('resultHeader');
const tableRef = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
const loader = document.getElementById('loader');
var setting = { display: false };


function setUrlNewPi (url, pi) {
    const newUrl = new URL(url);
    const searchParams = newUrl.searchParams;
    searchParams.set('pi', pi);
    return newUrl.href;
  }
  
  
  function searchParamPi (url) {
    const searchParams = new URL(url).searchParams;
    const pi = searchParams.get("pi") ?? 1;
    return parseInt(pi);
  }
  
  
  function setResultHeader (text) {
    resultHeader.innerHTML = `<p style="color: grey;"> ${text} </p>`;
    loader.classList.add("loader");
  }


  function createRow (element) {
    let newRow = tableRef.insertRow(0);
    
    let attributesStr = element.attributes.map(e => {
      atrStr = e.key.name + ': ' + e.value.name;
      return atrStr;
    }).toString();

    let size = element.size.map(e => {
      sizeStr = e.value + '(' + 'stock:' + e.stock + ')';
      return sizeStr;
    }).toString();

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
        <td style="width: 300px;">
          ${size}
        </td>
        <td style="width: 300px;">${attributesStr}</td>
        <td style="width: 80px;">${element.time}</td>
      </tr>`;

      // Delete row if length > 50
      if (tableRef.rows.length > 50) {
        tableRef.deleteRow(tableRef.rows.length - 1);
      }
  }
