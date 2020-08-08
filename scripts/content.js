let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

const dialogElementId = "show-color";
const dialogItemElementId = "show-color-item";

let mouseX = 0;
let mouseY = 0;

function receiver (request, sender, response) {
  if (request.message === 'start-detect') {
    window.addEventListener('mousemove', showDialog);
  }
}

function showDialog (event) {

  event.stopPropagation();

  mouseX = event.clientX;
  mouseY = event.clientY;

  let elementMouseIsOver = document.elementFromPoint(mouseX, mouseY);

  if (check(elementMouseIsOver)) {

    let docWidth = document.body.clientWidth;
    let docHeight = document.body.clientHeight;

    if (mouseX + 270 > docWidth) { mouseX = docWidth - 255; }
    if (mouseY + 165 > docHeight) { mouseY = docHeight - 150; }

    let elemntStyles = getStyles(elementMouseIsOver);

    createDialog(elemntStyles, { posX: mouseX - 13, posY: mouseY + 13 });
    if (chrome.app && typeof chrome.app.isInstalled !== 'undefined') {
      chrome.runtime.sendMessage({ elemntStyles });
    }
  }
}

function createDialog (styles, mousePos) {

  let { family, size, weight, style, background, color } = styles;
  let { posX, posY } = mousePos;

  color = Utils.rgbToHex(color.trim());
  background = Utils.rgbToHex(background.trim());

  Utils.removeDomElement(dialogElementId);
  const div = document.createElement('div');

  div.id = dialogElementId;
  div.style.left = posX + 'px';
  div.style.top = posY + 'px';

  div.innerHTML = `
  <div class="wi-100 di-flex justify-c-b pa-15" id="show-color-item">

    <div class="wi-100 di-flex-column mb-15">
      <small class="wi-100">Family</small>
      <span class="txt-w">${family}</span>
    </div>

    <div class="wi-50 di-flex mb-15">      
      <div class="wi-75 di-flex-column par-10">
        <small class="wi-100">Color</small>
        <span>${color}</span>       
      </div>

      <span class="m-box" style="background:${color}"></span>
    </div>

    <div class="wi-50 di-flex mb-15">      
      <div class="wi-75 di-flex-column par-10">
        <small class="wi-100">Background</small>
        <span>${color}</span>       
      </div>

      <span class="m-box" style="background:${color}"></span>
    </div>

    <div class="wi-25 di-flex-column">
      <small class="wi-100">Size</small>
      <span class="txt-w">${size}</span>
    </div>

    <div class="wi-25 di-flex-column">
      <small class="wi-100">Weight</small>
      <span class="txt-w">${weight}</span>
    </div>

    <div class="wi-25 di-flex-column">
      <small class="wi-100">Style</small>
      <span class="txt-w">${style}</span>
    </div>    
  </div>`;

  document.body.appendChild(div);
}

function check (elementMouseIsOver) {
  return (elementMouseIsOver && elementMouseIsOver.id !== dialogElementId)
    && elementMouseIsOver.parentElement.id !== dialogElementId
    && elementMouseIsOver.id !== dialogItemElementId
    && elementMouseIsOver.parentElement.id !== dialogItemElementId
}

function getStyles (element) {
  const getStyle = (name) => {
    return window.getComputedStyle(element, null).getPropertyValue(name);
  }

  let color = getStyle("color");
  let background = getStyle("background-color");
  let family = getStyle("font-family");

  let size = getStyle("font-size");
  let weight = getStyle("font-weight");
  let style = getStyle("font-style");

  return { color, background, family, size, weight, style };
}

chrome.runtime.onMessage.addListener(receiver);