import DOM from './DOM';
import Utils from './Utils';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

let boxContainer = null;
let isMouseOnBox = false;
let boxContentEL = null;

function receiver (request) {
  if (!boxContainer && request.message === 'start-detect') {
    let Box = BoxStyles();

    Box.createBox();

    ['button', 'a', 'form'].forEach(elements => {
      document.querySelectorAll(elements).forEach(el => {
        el.onsubmit = (e) => {
          e.preventDefault();
          return false;
        };

        el.onclick = (e) => {
          e.preventDefault();
          return false;
        };

        if (el.id !== 'box-link') {
          el.href = "javascript:void(0)";
          el.click = "javascript:void(0)";
        }
      });
    });

    window.addEventListener('click', (event) => {
      let elementMouseIsOver = document.elementFromPoint(event.clientX, event.clientY);
      if (boxContentEL && !isMouseOnBox) {
        Box.setStyles(elementMouseIsOver);
      }
    }, false);
  }
}

function BoxStyles () {
  let isBoxReadyToMove = false;
  let offset = [0, 0];

  return {
    createBox () {

      boxContainer = new DOM().createElement('div', { id: 'box-styles' }).appendTo(document.body);

      boxContentEL = new DOM().createElement('div', { id: 'box-styles-contents' }).get();

      boxContainer.appendChilds([this.createHeader(), boxContentEL, this.createFooter()]);

      document.addEventListener('mouseup', function () {
        isMouseOnBox = false;
        isBoxReadyToMove = false;
      }, true);

      document.addEventListener('mousemove', function (e) {
        e.preventDefault();
        if (isBoxReadyToMove) {
          boxContainer.get().style.left = (e.clientX + offset[0]) + 'px';
          boxContainer.get().style.top = (e.clientY + offset[1]) + 'px';
        }
      }, true);

      document.addEventListener('click', (e) => {
        isMouseOnBox = boxContainer && boxContainer.get().contains(e.target);
      }, false);
    },

    setStyles (element) {
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
    },

    createHeader () {
      let header = document.createElement('header');
      let btnClose = document.createElement('div');
      let title = document.createElement('h3');

      btnClose.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="18" viewBox="0 0 24 24" stroke="#ddd">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>`;

      title.innerHTML = '<img src="https://i.ibb.co/VHZjhDT/icon32.png" alt="" />Detector';

      header.appendChild(title);
      header.appendChild(btnClose);

      header.addEventListener('mousedown', function (e) {
        isMouseOnBox = true;
        isBoxReadyToMove = true;
        offset = [
          boxContainer.get().offsetLeft - e.clientX,
          boxContainer.get().offsetTop - e.clientY
        ];
      }, true);

      btnClose.addEventListener('click', () => {
        window.location.reload();
      }, false);

      return header;
    },

    createFooter () {
      return new DOM().createElement('footer', {}).createChilds([
        {
          nodeType: 'a',
          attributes: {
            href: 'https://github.com/Chromo-lib/detector',
            textContent: 'Made with coffee by Haikel Fazzani',
            id: 'box-link'
          }
        }
      ]).appendChilds().get();
    }
  }
}

chrome.runtime.onMessage.addListener(receiver);
