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
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-10p" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
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
