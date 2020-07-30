const btnDetect = document.getElementById('btn-detect');
let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
let currBrowser = isChrome ? chrome : browser;

function popup () {  

  currBrowser.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    let activeTab = tabs[0];
    currBrowser.tabs.sendMessage(activeTab.id, { "message": "start-detect" });
    btnDetect.innerHTML = 'ACTIVATED';
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (btnDetect) btnDetect.addEventListener("click", popup);
});
