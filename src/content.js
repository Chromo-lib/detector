import DOM from './DOM';
import Utils from './Utils';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

let boxContainer = null;
let isMouseOnBox = false;
let boxContentEL = null;
let elementMouseIsOver = null;

let lastElementMouseIsOver = null;

function receiver (request) {
  if (!boxContainer && request.message === 'start-detect') {
    let Box = BoxStyles();

    Box.createBox();

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

        if (el.id !== 'box-link') {
          el.href = "javascript:void(0)";
          el.click = "javascript:void(0)";
        }
      });
    });

    window.addEventListener('click', (event) => {

      elementMouseIsOver = document.elementFromPoint(event.clientX, event.clientY);
      elementMouseIsOver.onclick = (e) => {
        e.preventDefault();
        return false;
      };

      if (boxContentEL && !isMouseOnBox) {
        Box.setStyles(elementMouseIsOver);

        if (!lastElementMouseIsOver) {
          lastElementMouseIsOver = elementMouseIsOver;
        }

        if (Utils.compareTwoDomElements(lastElementMouseIsOver, elementMouseIsOver)) {
          lastElementMouseIsOver.classList.remove('element-border');
          lastElementMouseIsOver = elementMouseIsOver;
          elementMouseIsOver.dataset.foo = elementMouseIsOver.nodeName;
          elementMouseIsOver.classList.add('element-border');
        }
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

      boxContentEL.addEventListener("input", function (e) {
        let isElTypeInput = (e.target.name === 'color' || e.target.name === 'background');
        let nodeStyle = isElTypeInput ? e.target.name : e.target.dataset.node;
        lastElementMouseIsOver.style[nodeStyle] = isElTypeInput ? e.target.value : e.target.textContent;
      }, false);
    },

    setStyles (element) {
      const getStyle = (name) => {
        return window.getComputedStyle(element, null).getPropertyValue(name);
      }

      boxContentEL.innerHTML = `<ul>
        <li>
          <span class="txt-muted">family</span><br>
          <span contenteditable="true" data-node="fontFamily">${getStyle("font-family")}</span>
        </li>
      </ul>
    
      <ul>
        <li>
          <span class="txt-muted">node</span><br>
          <span class="truncate">${element.nodeName}</span>
        </li>
    
        <li>
          <span class="txt-muted">width</span><br>
          <span contenteditable="true" data-node="width">${getStyle("width")}</span>
        </li>
    
        <li>
          <span class="txt-muted">height</span><br>
          <span contenteditable="true" data-node="height">${getStyle("height")}</span>
        </li>
      </ul>
    
      <ul class="colu-2">
        <li>
          <span class="txt-muted">color</span><br>
          <span contenteditable="true" data-node="color">${Utils.rgbToHex(getStyle("color"))}</span><br>
          <input type="color" name="color" value="${Utils.rgbToHex(getStyle("color"))}">
        </li>
    
        <li>
          <span class="txt-muted">background</span><br>
          <span contenteditable="true" data-node="backgroundColor">${Utils.rgbToHex(getStyle("background-color"))}</span><br>
          <input type="color" name="background" value="${Utils.rgbToHex(getStyle("background-color"))}">
        </li>
      </ul>
    
      <ul>
        <li>
          <span class="txt-muted">size</span><br>
          <span contenteditable="true" data-node="fontSize">${getStyle("font-size")}</span>
        </li>
    
        <li>
          <span class="txt-muted">weight</span><br>
          <span contenteditable="true" data-node="fontWeight">${getStyle("font-weight")}</span>
        </li>
    
        <li>
          <span class="txt-muted">style</span><br>
          <span contenteditable="true" data-node="fontStyle">${getStyle("font-style")}</span>
        </li>
      </ul>
      
      <ul>
        <li>
          <span class="txt-muted">box shadow</span><br>
          <span contenteditable="true" data-node="boxShadow">${getStyle("box-shadow")}</span>
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

      title.innerHTML = '<img src="https://i.ibb.co/VHZjhDT/icon32.png" alt="" /> Style Detector';

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
        Utils.removeElement('box-styles');
        boxContainer = null;
        boxContentEL = null;
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
