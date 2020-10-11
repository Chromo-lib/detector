import React, { useEffect, useState } from 'react';
import ListStyles from './components/ListStyles';
import Draggable from './Draggable';
import rgbToHex from './utils/rgbToHexa';
import compareElements from './utils/compareElements';
import Modal from './components/Modal';
import ListAnimation from './components/ListAnimation';

const tabs = [
  { id: 0, name: 'base' },
  { id: 1, name: 'animation' }
];

export default function App () {

  const [boxStyleEL, setBoxStyleEL] = useState(null);
  const [selectedElemnt, setSelectedElemnt] = useState(null);
  const [selectedElementStyles, setSelectedElementStyles] = useState(null);
  const [currTabId, setCurrTabId] = useState(0);

  useEffect(() => {
    let lastSelectedElemnt = null;
    const handleWinClick = (e) => {
      let isMouseOnBox = boxStyleEL && boxStyleEL.contains(e.target);

      if (boxStyleEL && !isMouseOnBox) {

        let selectElemnt = document.elementFromPoint(e.clientX, e.clientY);
        setSelectedElemnt(selectElemnt);

        const gs = (name) => {
          if (selectElemnt && name) { return window.getComputedStyle(selectElemnt, null).getPropertyValue(name); }
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

  const onTabSwitch = (tabId) => {
    setCurrTabId(tabId);
  }

  return (<Draggable setBoxStyleEL={setBoxStyleEL}>

    <div className="w-100 vertical-center column-2 padd-5 pb-0">
      {tabs.map(tab => <button
        onClick={() => { onTabSwitch(tab.id) }}
        className={"vertical-center " + (currTabId === tab.id ? 'activ-tab' : '')}
        key={tab.id}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" width="14" className="mr-10p"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        {tab.name}
      </button>)}
    </div>


    {currTabId === 0
      ? <>
        <ListStyles
          data={selectedElementStyles}
          selectedElemnt={selectedElemnt}
          selectedElementStyles={selectedElementStyles}
          setSelectedElementStyles={setSelectedElementStyles}
        />

        {selectedElementStyles && <Modal selectedElemnt={selectedElemnt} selectedElementStyles={selectedElementStyles} />}
      </>
      : <ListAnimation selectedElemnt={selectedElemnt} />}

    <footer>
      <p className="w-100 m-0p txt-center">Created by <a href="https://github.com/haikelfazzani">Haikel Fazzani</a></p>
    </footer>
  </Draggable>);
}