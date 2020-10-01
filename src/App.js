import React, { useEffect, useState } from 'react';
import ListStyles from './components/ListStyles';
import Draggable from './Draggable';
import rgbToHex from './utils/rgbToHexa';
import compareElements from './utils/compareElements';
import copyToClipboard from './utils/copyToClipboard';

export default function App () {

  const [boxStyleEL, setBoxStyleEL] = useState(null);
  const [selectedElemnt, setSelectedElemnt] = useState(null);
  const [selectedElementStyles, setSelectedElementStyles] = useState(null);

  const [actionStatus, setActionsStatus] = useState({
    isCopied: false,
    isModalOpen: false
  });

  useEffect(() => {
    let lastSelectedElemnt = null;
    const handleWinClick = (e) => {
      let isMouseOnBox = boxStyleEL && boxStyleEL.contains(e.target);

      if (boxStyleEL && !isMouseOnBox) {

        let selectElemnt = document.elementFromPoint(e.clientX, e.clientY);
        setSelectedElemnt(selectElemnt);

        const gs = (name) => {
          return window.getComputedStyle(selectElemnt, null).getPropertyValue(name);
        }

        setSelectedElementStyles([
          {
            title: 'fonts', items: [
              { name: 'font-family', value: gs('font-family') },
              { name: 'font-size', value: gs('font-size') },
              { name: 'font-weight', value: gs('font-weight') },
              { name: 'font-style', value: gs('font-style') },
            ]
          },
          {
            title: 'color & borders', items: [
              { name: 'color', value: rgbToHex(gs('color')) },
              { name: 'background', value: rgbToHex(gs('background')) },
              { name: 'opacity', value: gs('opacity') },
              { name: 'box-shadow', value: gs('box-shadow') },
              { name: 'border-radius', value: gs('border-radius') },
              { name: 'border', value: gs('border') },
            ]
          },
          {
            title: 'size & spacing', items: [
              { name: 'width', value: gs('width') },
              { name: 'height', value: gs('height') },
              { name: 'margin', value: gs('margin') },
              { name: 'padding', value: gs('padding') },
              { name: 'line-height', value: gs('line-height') },
              { name: 'overflow', value: gs('overflow') }
            ]
          },
          {
            title: 'display & positions', items: [
              { name: 'display', value: gs('display') },
              { name: 'position', value: gs('position') },
              { name: 'top', value: gs('top') },
              { name: 'left', value: gs('left') },
              { name: 'right', value: gs('right') },
              { name: 'bottom', value: gs('bottom') }
            ]
          },
          {
            title: 'text', items: [
              { name: 'text-align', value: gs('text-align') },
              { name: 'text-transform', value: gs('text-transform') },
              { name: 'text-shadow', value: gs('text-shadow') },
              { name: 'letter-spacing', value: gs('letter-spacing') }
            ]
          },
        ]);


        if (!lastSelectedElemnt) {
          lastSelectedElemnt = selectElemnt;
        }

        if (compareElements(lastSelectedElemnt, selectElemnt)) {
          lastSelectedElemnt.classList.remove('element-border');
          lastSelectedElemnt = selectElemnt;
          lastSelectedElemnt.dataset.att = selectElemnt.nodeName;
          selectElemnt.dataset.att = selectElemnt.nodeName;
          selectElemnt.classList.add('element-border');
        }
      }
    }

    window.addEventListener('click', handleWinClick, true);
    return () => {
      window.removeEventListener('click', handleWinClick);
    }
  }, [boxStyleEL]);

  const onCopy = () => {
    if (selectedElementStyles) {
      copyToClipboard(JSON.stringify(selectedElementStyles));
      setActionsStatus({ ...actionStatus, isCopied: true });
      setTimeout(() => {
        setActionsStatus({ ...actionStatus, isCopied: false });
      }, 2000);
    }
  }

  const onToggleModal = () => {
    setActionsStatus({ isCopied: false, isModalOpen: !actionStatus.isModalOpen });
  }

  return (<Draggable setBoxStyleEL={setBoxStyleEL}>

    <ListStyles
      data={selectedElementStyles}
      selectedElemnt={selectedElemnt}
      selectedElementStyles={selectedElementStyles}
      setSelectedElementStyles={setSelectedElementStyles}
    />

    {selectedElementStyles
      && <>
        <div className="w-100 vertical-center column-2">
          <button onClick={onCopy} className="vertical-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" width="16" className="mr-10p">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>{actionStatus.isCopied ? 'copied' : 'Copy'}</button>
          <button onClick={onToggleModal} className="vertical-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" width="16" className="mr-10p">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>Show</button>
        </div>

        <div className={"box-modal vertical-center " + (actionStatus.isModalOpen ? '' : 'disp-none')}>
          <textarea>{JSON.stringify(selectedElementStyles, null, ' ')}</textarea>

          <div className="btns-modal">
            <button className="mr-10 vertical-center" onClick={onCopy}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" width="16" className="mr-10p">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>{actionStatus.isCopied ? 'copied' : 'Copy'}</button>
            <button onClick={onToggleModal} className="vertical-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" width="16" className="mr-10p">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>close</button>
          </div>
        </div>
      </>}

    <footer>
      <p className="w-100 m-0p txt-center">Created by <a href="https://github.com/haikelfazzani">Haikel Fazzani</a></p>
    </footer>
  </Draggable>);
}