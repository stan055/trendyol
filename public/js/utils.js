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
  
  
  function setResultHeader (text, _loader = true) {
    resultHeader.innerHTML = `<p style="color: grey;"> ${text} </p>`;
    downloadDataLink.classList.add("show");
    if (_loader) {
      loader.classList.add("loader");
    } else {
      loader.classList.remove("loader");
    }
  }



