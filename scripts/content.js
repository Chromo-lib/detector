const dialogElementId = "show-color";
const dialogItemElementId = "show-color-item";

let mouseX = 0;
let mouseY = 0;

function receiver (request, sender, response) {
  if (request.message === 'start-detect') {
    window.addEventListener('click', showDialog);
  }
}

function showDialog (event) {
  mouseX = event.clientX;
  mouseY = event.clientY;

  let elementMouseIsOver = document.elementFromPoint(mouseX, mouseY);

  if (check(elementMouseIsOver)) {

    let docWidth = document.body.clientWidth;
    let docHeight = document.body.clientHeight;

    let color = window.getComputedStyle(elementMouseIsOver, null).getPropertyValue("color");
    let bgColor = window.getComputedStyle(elementMouseIsOver, null).getPropertyValue("background-color");
    let fontFamily = window.getComputedStyle(elementMouseIsOver, null).getPropertyValue("font-family");

    let fontSize = window.getComputedStyle(elementMouseIsOver, null).getPropertyValue("font-size");
    let fontWeight = window.getComputedStyle(elementMouseIsOver, null).getPropertyValue("font-weight");
    let fontStyle = window.getComputedStyle(elementMouseIsOver, null).getPropertyValue("font-style");

    if (mouseX + 250 > docWidth) {
      mouseX = docWidth - 250;
    }

    if (mouseY + 150 > docHeight) {
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

  div.innerHTML = `<pre class="wi-100 he-75 di-flex m-0 pa-15" style="font-family:${fontFamily}">
    ${fontFamily}
  </pre>
  
  <div class="wi-100 he-25 di-flex bd-top" id="show-color-item">
    <span class="wi-50 di-flex pa-5 bd-right" 
    style="background:${color}; color:${Utils.isColorLight(color) ? '#000' : '#fff'}">C: ${color}</span>


    <span class="wi-50 di-flex pa-5 bd-left" 
    style="background:${bgColor}; color: ${Utils.isColorLight(bgColor) ? '#000' : '#fff'}">B: ${bgColor}</span>
  </div>
  
  
  <div class="wi-100 he-25 di-flex bd-top" id="show-color-item">
    <span class="di-flex pa-5 bd-right">F: ${fontSize}</span>
    <span class="di-flex pa-5 bd-right">W: ${fontWeight}</span>
    <span class="di-flex pa-5 bd-left">W: ${fontStyle}</span>
  </div>
  
  <div class="wi-100 he-25 di-flex bd-top" id="show-color-item">
  <a class="wi-50 di-flex pa-5 txt-muted fs-10" target="_blank" href="https://github.com/Chromo-lib/detector">Via Detector v1</span>
    <a class="wi-50 di-flex pa-5 txt-muted fs-10" target="_blank" href="https://github.com/Chromo-lib/detector/issues">Issues</span>
  </div>`;

  document.body.appendChild(div);
}

function check (elementMouseIsOver) {
  return elementMouseIsOver.id !== dialogElementId
    && elementMouseIsOver.parentElement.id !== dialogElementId
    && elementMouseIsOver.id !== dialogItemElementId
    && elementMouseIsOver.parentElement.id !== dialogItemElementId
}

chrome.runtime.onMessage.addListener(receiver);