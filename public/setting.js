const settingBrowser = document.getElementById('browser');

settingBrowser.addEventListener('change', e => {
    setting.display = e.target.checked;
});