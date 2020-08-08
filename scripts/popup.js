const btnDetect = document.getElementById('btn-detect');
let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

function popup () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "message": "start-detect" });
    btnDetect.innerHTML = 'ACTIVATED';
  });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  const elementStats = document.getElementById('element-stats');

  let { elemntStyles } = message;

  elementStats.innerHTML = '';

  Object.keys(elemntStyles).forEach(elStyle => {
    if (elStyle === 'background' || elStyle === 'color') {
      elemntStyles[elStyle] = Utils.rgbToHex(elemntStyles[elStyle]);
    }
    elementStats.innerHTML += Utils.createBox(elStyle + ': ', elemntStyles[elStyle]);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  if (btnDetect) btnDetect.addEventListener("click", popup);
});
