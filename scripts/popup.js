const btnDetect = document.getElementById('btn-detect');

function popup () {

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "message": "start-detect" });
    btnDetect.innerHTML = '<img src="./icons/icon32.png" alt="detector" /> ACTIVATED';
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (btnDetect) btnDetect.addEventListener("click", popup);
});
