const btnStart = document.getElementById('btnStart');
const inputUrl = document.getElementById('inputUrl');
const resultHeader = document.getElementById('resultHeader');
const tableRef = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
const loader = document.getElementById('loader');

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
          type: 'start'
        })
      })
      .then(response => response.json())
      .then(async data => {
        resultHeader.innerHTML = `<p style="color: green;"> ${data['result']} </p>`;
        loader.classList.add("loader");

        let urlCount = 1;
        let url = `${inputUrl.value}&pi=${urlCount}`;
        let response = true;

        while (response) {

          response = await parsing(url);
          console.log(url, response);

          urlCount++;
          url = `${inputUrl.value}&pi=${urlCount}`;
        }

      })
      .catch((error) => {
        resultHeader.innerHTML = `<p style="color: red;"> ${error} <p>`;
        
      });
})

let productCounter = 0;

async function parsing (url) {
  const result = await fetch('/api', {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        type: 'parsing'
      })
    })
    .then(response => response.json())
    .then(data => {
      
      console.log(data);
      data.result.forEach(element => {
        let newRow = tableRef.insertRow(0);
        newRow.innerHTML = 
        `<tr>
          <th scope="row">${productCounter++}</th>
          <td>${element.name}</td>
          <td><a href="${element.url}">${element.url}</a></td>
          <td>${element.color}</td>
          <td>${element.price}</td>
          <td>${element.disprice}</td>
          <td>${element.material}</td>
          <td>${element.size}</td>
        </tr>`;
      });

      return true;      
    })
    .catch((error) => {
      resultHeader.innerHTML = `<p style="color: red;"> ${error} <p>`;
      return false
    });

    return result;
}