
btnStartList.addEventListener('click',  (e) => {
    let str = textArea.value;
    let urls = str.match(pattUrl);
    listBtnStopSwitch = false;

    if (urls) {
      scrapFromListUrls(urls);
    }
})

