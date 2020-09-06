import Utils from './Utils';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

let boxContainerEL = null;
let isBoxReadyToMove = false;
let isMouseOnBox = false;
let boxContentEL = null;
let offset = [0, 0];

function receiver (request) {
  if (!boxContainerEL && request.message === 'start-detect') {
    createboxContentEL();    
    window.addEventListener('click', showDialog, false);
  }
}

function showDialog (event) {
  let elementMouseIsOver = document.elementFromPoint(event.clientX, event.clientY);  
  if (boxContentEL && !isMouseOnBox) {
    Utils.preventOpenLink(event);
    getStyles(boxContentEL, elementMouseIsOver);
  }
}

function createboxContentEL () {
  // the box styles shown when user click on element
  boxContainerEL = document.createElement('div');
  boxContainerEL.id = 'box-styles';

  // box header creation
  let header = document.createElement('header');
  let title = document.createElement('h3');
  let button = document.createElement('div');
  button.title = 'Move box';
  title.textContent = 'Style detector';
  
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" fill="white" viewBox="0 0 24 24" stroke="white">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
</svg>`;

  header.appendChild(title);
  header.appendChild(button);
  boxContainerEL.appendChild(header);
  // end header creation

  const footer = document.createElement('footer')
  const link = document.createElement('a');
  link.href = 'https://github.com/Chromo-lib/detector';
  link.textContent = 'Made with coffee by Haikel Fazzani';
  footer.appendChild(link);

  boxContentEL = document.createElement('div');
  boxContentEL.id = 'box-styles-contents';

  boxContainerEL.appendChild(boxContentEL);
  boxContainerEL.appendChild(footer);
  document.body.appendChild(boxContainerEL);

  button.addEventListener('mousedown', function (e) {
    isMouseOnBox = true;
    isBoxReadyToMove = true;
    offset = [
      boxContainerEL.offsetLeft - e.clientX,
      boxContainerEL.offsetTop - e.clientY
    ];
  }, true);

  document.addEventListener('mouseup', function () {
    isMouseOnBox = false;
    isBoxReadyToMove = false;
  }, true);

  document.addEventListener('mousemove', function (e) {
    e.preventDefault();
    if (isBoxReadyToMove) {
      boxContainerEL.style.left = (e.clientX + offset[0]) + 'px';
      boxContainerEL.style.top = (e.clientY + offset[1]) + 'px';
    }
  }, true);

  document.addEventListener('click', (e) => {
    isMouseOnBox = boxContainerEL.contains(e.target);
  });
}


function getStyles (boxContentEL, element) {
  const getStyle = (name) => {
    return window.getComputedStyle(element, null).getPropertyValue(name);
  }

  boxContentEL.innerHTML = `<ul>
    <li>
      <span class="txt-muted">family</span><br>
      <span>${getStyle("font-family")}</span>
    </li>
  </ul>

  <ul>
    <li>
      <span class="txt-muted">node</span><br>
      <span>${element.nodeName}</span>
    </li>

    <li>
      <span class="txt-muted">width</span><br>
      <span>${getStyle("width")}</span>
    </li>

    <li>
      <span class="txt-muted">height</span><br>
      <span>${getStyle("height")}</span>
    </li>
  </ul>

  <ul class="colu-2">
    <li>
      <span class="txt-muted">color</span><br>
      <span>${Utils.rgbToHex(getStyle("color"))}</span><br>
      <input type="color" name="color" value="${Utils.rgbToHex(getStyle("color"))}">
    </li>

    <li>
      <span class="txt-muted">background</span><br>
      <span>${Utils.rgbToHex(getStyle("background-color"))}</span><br>
      <input type="color" name="background" value="${Utils.rgbToHex(getStyle("background-color"))}">
    </li>
  </ul>

  <ul>
    <li>
      <span class="txt-muted">size</span><br>
      <span>${getStyle("font-size")}</span>
    </li>

    <li>
      <span class="txt-muted">weight</span><br>
      <span>${getStyle("font-weight")}</span>
    </li>

    <li>
      <span class="txt-muted">style</span><br>
      <span>${getStyle("font-style")}</span>
    </li>
  </ul>
  
  <ul>
    <li>
      <span class="txt-muted">box shadow</span><br>
      <span>${getStyle("box-shadow")}</span>
    </li>
  </ul>`;
}

chrome.runtime.onMessage.addListener(receiver);
