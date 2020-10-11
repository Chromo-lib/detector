import React, { useState } from 'react';
import copyToClipboard from '../utils/copyToClipboard';

function formatStyles (selectedElemnt, selectedElementStyles) {
  if (selectedElemnt && selectedElementStyles) {
    let stElementStyles = selectedElementStyles.reduce((str, st) => {
      str += st.items.reduce((a, c) => {
        a += '\t' + c.name + ': ' + c.value + ';\n'
        return a;
      }, '');
      return str;
    }, '');

    let classList = [...selectedElemnt.classList];

    if (classList.length > 0) {
      stElementStyles = `${selectedElemnt.nodeName}.${classList[0]} {\n${stElementStyles}}`;
    } else {
      stElementStyles = `${selectedElemnt.nodeName} {\n${stElementStyles}}`;
    }
    return stElementStyles;
  }
  return null;
}

export default function Modal ({ selectedElemnt, selectedElementStyles }) {

  const [state, setState] = useState({
    isCopied: false,
    isModalOpen: false,
    stElementStyles: null
  });

  const onCopy = () => {
    if (state.stElementStyles) {
      copyToClipboard(state.stElementStyles);
      setState({ ...state, isCopied: true });
      setTimeout(() => {
        setState({
          ...state,
          isCopied: false,
          stElementStyles: formatStyles(selectedElemnt, selectedElementStyles)
        });
      }, 2000);
    }
  }

  const onToggleModal = () => {
    setState({
      isCopied: false,
      isModalOpen: !state.isModalOpen,
      stElementStyles: formatStyles(selectedElemnt, selectedElementStyles)
    });
  }

  return (<>
    <div className="w-100 vertical-center column-2 padd-5">
      <button onClick={onCopy} className="vertical-center bg-rose"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" width="16" className="mr-10p">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>{state.isCopied ? 'copied' : 'Copy'}</button>
      <button onClick={onToggleModal} className="vertical-center bg-rose"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" width="16" className="mr-10p">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>Show</button>
    </div>

    <div className={"box-modal vertical-center flex-wrap " + (state.isModalOpen ? '' : 'disp-none')}>
      {state.isModalOpen && <textarea defaultValue={state.stElementStyles} />}

      <div className="btns-modal">
        <button className="mr-10 vertical-center" onClick={onCopy}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" width="16" className="mr-10p">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>{state.isCopied ? 'copied' : 'Copy'}</button>
        <button onClick={onToggleModal} className="vertical-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" width="16" className="mr-10p">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>close</button>
      </div>
    </div>
  </>);
}