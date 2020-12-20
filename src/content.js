import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './content.css';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

function receiver (request={message : 'start-detect'}) {
  let divRoot = document.getElementById('root-fabritor-styles');

  if (!divRoot && request.message === 'start-detect') {

    const cvnRoot = document.createElement('canvas');
    cvnRoot.id = 'fab-editor-canvas';
    document.body.appendChild(cvnRoot);    

    divRoot = document.createElement('div');
    divRoot.id = 'root-fabritor-styles';
    document.body.appendChild(divRoot);

    ReactDOM.render(<App />, divRoot);
  }
}

if(chrome && chrome.runtime) {
  chrome.runtime.onMessage.addListener(receiver);
}
else {
  receiver()
}