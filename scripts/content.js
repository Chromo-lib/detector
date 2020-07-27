const dialogElementId = "show-color";
const dialogItemElementId = "show-color-item";

let mouseX = 0;
let mouseY = 0;

function receiver (request, sender, response) {
  console.log(request.message);
  if (request.message === 'start-detect') {
    window.addEventListener('click', showDialog);
  }
}

function showDialog (event) {
  mouseX = event.clientX;
  mouseY = event.clientY;

  let docWidth = document.body.clientWidth;
  let docHeight = document.body.clientHeight;

  let elementMouseIsOver = document.elementFromPoint(mouseX, mouseY);

  if (check(elementMouseIsOver)) {

    let color = window.getComputedStyle(elementMouseIsOver, null).getPropertyValue("color");
    let bgColor = window.getComputedStyle(elementMouseIsOver, null).getPropertyValue("background-color");
    let fontFamily = window.getComputedStyle(elementMouseIsOver, null).getPropertyValue("font-family");

    if (mouseX + 250 > docWidth) {
      mouseX = mouseX - 250;
    }

    if (mouseY + 250 > docHeight) {
      mouseY = mouseY - 50;
    }

    createDialog(
      fontFamily,
      Utils.rgbToHex(color.trim()),
      Utils.rgbToHex(bgColor.trim()),      
      mouseX,
      mouseY
    );
  }
}

function createDialog (fontFamily, color, bgColor, posX, posY) {
  Utils.removeDomElement(dialogElementId);
  const div = document.createElement('div');
  div.id = dialogElementId;
  div.style.left = posX + 'px';
  div.style.top = posY + 'px';

  div.innerHTML = `<span class="wi-100 he-50 di-flex p-15" style="font-family:${fontFamily}">${fontFamily}</span>
  <div class="wi-100 he-50 di-flex" id="show-color-item">
    <span class="wi-50 di-flex p-15" style="background:${color}">C: ${color}</span>
    <span class="wi-50 di-flex p-15" style="background:${bgColor}; color: ${color}">B: ${bgColor}</span>
  </div>`;

  document.body.appendChild(div);
}

function check(elementMouseIsOver) {
  return elementMouseIsOver.id !== dialogElementId 
  && elementMouseIsOver.parentElement.id !== dialogElementId
  && elementMouseIsOver.id !== dialogItemElementId 
  && elementMouseIsOver.parentElement.id !== dialogItemElementId
}

chrome.runtime.onMessage.addListener(receiver);