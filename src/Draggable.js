import React, { useEffect, useRef } from 'react';
import removeElement from './utils/removeElement';

export default function Draggable ({ children, setBoxStyleEL }) {

  const boxRef = useRef(null);
  const boxHeaderRef = useRef(null);

  useEffect(() => {
    if (!boxRef.current) {
      return;
    }

    const target = boxRef.current;
    setBoxStyleEL(target);
    let offset = [0, 0];
    let isReadyToMove = false;

    function onMousedown (e) {
      isReadyToMove = true;
      offset = [
        target.offsetLeft - e.clientX,
        target.offsetTop - e.clientY
      ];
      e.stopPropagation();
      e.preventDefault();
    }

    function onMouseMove (e) {
      if (isReadyToMove) {
        target.style.left = (e.clientX + offset[0]) + 'px';
        target.style.top = (e.clientY + offset[1]) + 'px';
      }
      e.stopPropagation();
      e.preventDefault();
    }

    function onMouseUp (e) {
      isReadyToMove = false;
      e.stopPropagation();
      e.preventDefault();
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    boxHeaderRef.current.addEventListener('mousedown', onMousedown);

    return () => {
      boxHeaderRef.current.removeEventListener('mousedown', onMousedown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [boxRef]);

  const onCloseBox = () => {
    removeElement('root-box-styles');
  }

  return <div ref={boxRef} className="box-styles">
    <header ref={boxHeaderRef} className="w-100 vertical-center">
      <span className="disp-flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" width="16" className="mr-5p">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>Style detector</span>

      <button type="button" onClick={onCloseBox} title="Close box" className="btn-close vertical-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="#fff">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
    </header>
    {children}
  </div>
}
