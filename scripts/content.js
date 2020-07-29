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

    let color = window.getComputedStyle(elementMouseIsOver, null).getPropertyValue("color");
    let bgColor = window.getComputedStyle(elementMouseIsOver, null).getPropertyValue("background-color");
    let fontFamily = window.getComputedStyle(elementMouseIsOver, null).getPropertyValue("font-family");

    let fontSize = window.getComputedStyle(elementMouseIsOver, null).getPropertyValue("font-size");
    let fontWeight = window.getComputedStyle(elementMouseIsOver, null).getPropertyValue("font-weight");
    let fontStyle = window.getComputedStyle(elementMouseIsOver, null).getPropertyValue("font-style");

    let docWidth = document.body.clientWidth;
    let docHeight = document.body.clientHeight;

    if (mouseX + 270 > docWidth) {
      mouseX = docWidth - 255;
    }

    if (mouseY + 165 > docHeight) {
      mouseY = docHeight - 150;
    }

    createDialog(
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      Utils.rgbToHex(color.trim()),
      Utils.rgbToHex(bgColor.trim()),
      mouseX - 13,
      mouseY + 13
    );
  }
}

function createDialog (fontFamily, fontSize, fontWeight, fontStyle, color, bgColor, posX, posY) {
  Utils.removeDomElement(dialogElementId);
  const div = document.createElement('div');

  div.id = dialogElementId;
  div.style.left = posX + 'px';
  div.style.top = posY + 'px';

  div.innerHTML = `
  <div class="wi-100 di-flex justify-c-b pa-15" id="show-color-item">

    <div class="wi-100 di-flex-column mb-15">
      <small class="wi-100">Family</small>
      <span class="txt-w">${fontFamily}</span>
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
        <span>${bgColor}</span>       
      </div>

      <span class="m-box" style="background:${bgColor}"></span>
    </div>

    <div class="wi-25 di-flex-column">
      <small class="wi-100">Size</small>
      <span class="txt-w">${fontSize}</span>
    </div>

    <div class="wi-25 di-flex-column">
      <small class="wi-100">Weight</small>
      <span class="txt-w">${fontWeight}</span>
    </div>

    <div class="wi-25 di-flex-column">
      <small class="wi-100">Style</small>
      <span class="txt-w">${fontStyle}</span>
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

chrome.runtime.onMessage.addListener(receiver);