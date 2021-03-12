const btnStart = document.getElementById('btnStart');
const inputUrl = document.getElementById('inputUrl');
const resultHeader = document.getElementById('resultHeader');
const loader = document.getElementById('loader');
var setting = { display: false };
const settingBrowser = document.getElementById('browser');
const btnStartList = document.querySelector('#btnStartList');
const textArea = document.querySelector('#inputUrlList');
const tableRef = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
const categoryBtnStop = document.getElementById('categoryBtnStop');
const listBtnStop = document.getElementById('listBtnStop');
const pattUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
const downloadDataLink = document.getElementById('downloadDataLink');


let productCounter = 0;
let btnStopSwitch = false;





