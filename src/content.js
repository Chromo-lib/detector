import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './content.css';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

function receiver (request) {
  let divRoot = document.getElementById('root-box-styles');

  if (!divRoot && request.message === 'start-detect') {
    divRoot = document.createElement('div');
    divRoot.id = 'root-box-styles';
    document.body.appendChild(divRoot);

    ['button', 'a', 'form'].forEach(tag => {
      document.querySelectorAll(tag).forEach(el => {
        el.onsubmit = (e) => {
          e.preventDefault();
          return false;
        };

        el.onclick = (e) => {
          e.preventDefault();
          return false;
        };

        if (el.id !== 'root-box-styles') {
          el.href = "javascript:void(0)";
          el.click = "javascript:void(0)";
        }
      });
    });

    ReactDOM.render(<App />, divRoot);
  }
}

chrome.runtime.onMessage.addListener(receiver);