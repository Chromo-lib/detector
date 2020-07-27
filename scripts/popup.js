const btnDetect = document.getElementById('btn-detect');
let isActiveDetect = false;

function popup () {
  isActiveDetect = true;

  btnDetect.classList.add('bg-dark');

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "message": "start-detect" });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if(btnDetect) btnDetect.addEventListener("click", popup);
});
