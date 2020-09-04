let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

const btnDetect = document.getElementById('btn-detect');

function popup () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "message": "start-detect" });
    btnDetect.innerHTML = 'ACTIVATED';
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (btnDetect) {
    btnDetect.addEventListener("click", popup, false);
  }
});
