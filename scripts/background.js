function receiver (request, sender, response) {
}

chrome.runtime.onMessage.addListener(receiver);
