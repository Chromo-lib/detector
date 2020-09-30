import DOM from './DOM';
import Utils from './Utils';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

let boxContainer = null;
let isMouseOnBox = false;
let boxContentEL = null;
let elementMouseIsOver = null;
let elmntStyles = [];

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

      if (boxContentEL && !isMouseOnBox) {
        Box.setStyles(elementMouseIsOver);

        if (!lastElementMouseIsOver) {
          lastElementMouseIsOver = elementMouseIsOver;
        }

        if (Utils.compareTwoDomElements(lastElementMouseIsOver, elementMouseIsOver)) {
          lastElementMouseIsOver.classList.remove('element-border');
          lastElementMouseIsOver = elementMouseIsOver;
          lastElementMouseIsOver.dataset.att = elementMouseIsOver.nodeName;
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

    setStyles: (element) => {
      const getStyle = (name) => {
        return window.getComputedStyle(element, null).getPropertyValue(name);
      }

      const createList = (items = []) => {
        const list = document.createElement('ul');
        list.classList.add('column-' + items.length);

        items.forEach(item => {
          const li = document.createElement('li');
          const hSpan = document.createElement('span');
          const vSpan = document.createElement('span');

          li.classList.add('horizontal-center');

          hSpan.textContent = item.name;
          hSpan.classList.add('txt-muted');

          vSpan.contentEditable = true;
          vSpan.dataset.node = item.name;
          vSpan.textContent = item.value;

          li.appendChild(hSpan);
          li.appendChild(vSpan);

          if (item.name === 'color' || item.name === 'background') {
            let val = Utils.rgbToHex(item.value);
            vSpan.textContent = val;
            li.innerHTML += `<input type="color" name="${item.name}" value="${val}">`
          }

          list.appendChild(li);
        });

        return list;
      }

      boxContentEL.innerHTML = null;

      let nwh = [
        { name: 'node', value: element.nodeName },
        { name: 'width', value: getStyle('width') },
        { name: 'height', value: getStyle('height') }
      ];

      let sws = [
        { name: 'size', value: getStyle('font-size') },
        { name: 'weight', value: getStyle('font-weight') },
        { name: 'style', value: getStyle('font-style') }
      ];

      let cb = [
        { name: 'color', value: getStyle('color') },
        { name: 'background', value: getStyle('background') }
      ];

      boxContentEL.appendChild(createList([{ name: 'Font family', value: getStyle("font-family") }]));
      boxContentEL.appendChild(createList(nwh));
      boxContentEL.appendChild(createList(cb));
      boxContentEL.appendChild(createList(sws));
      boxContentEL.appendChild(createList([
        { name: 'padding', value: getStyle("padding") },
        { name: 'margin', value: getStyle("margin") }
      ]));
      boxContentEL.appendChild(createList([{ name: 'Box shadow', value: getStyle("box-shadow") }]));

      elmntStyles = [];
      elmntStyles = [...nwh, ...sws, ...cb];
    },

    createHeader () {
      let header = document.createElement('header');
      let btnClose = document.createElement('div');
      let btnCopy = new DOM().createElement('div', {
        textContent: 'copy',
        className: 'but',
        onclick: (e) => {
          let context = e.target;
          let res = elmntStyles.reduce((a, c) => {
            a[c.name] = c.value;
            return a;
          }, {});
   
          let dummy = document.createElement("textarea");
          document.body.appendChild(dummy);
          dummy.value = JSON.stringify(res);
          dummy.select();
          document.execCommand("copy");
          document.body.removeChild(dummy);

          context.textContent = 'copied';
          setTimeout(() => {
            context.textContent = 'copy';
          }, 2000);
        }
      });
      let title = document.createElement('h3');

      btnClose.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="18" viewBox="0 0 24 24" stroke="#ddd">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>`;

      title.innerHTML = '<img src="https://i.ibb.co/VHZjhDT/icon32.png" alt="" /> Style Detector';

      header.appendChild(title);
      header.appendChild(btnCopy.get());
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
    },
  }
}

chrome.runtime.onMessage.addListener(receiver);
