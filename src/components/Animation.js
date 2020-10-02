import React, { useState } from 'react';
import removeElement from '../utils/removeElement';

const trnsformProps = [
  { name: 'scaleX', value: '1', title: '' },
  { name: 'scaleY', value: '1', title: '' },
  { name: 'TranslateX', value: '0px', title: '' },
  { name: 'TranslateY', value: '0px', title: '' },
  { name: 'rotateX', value: '0deg', title: '' },
  { name: 'rotateY', value: '0deg', title: '' },
  { name: 'SkewX', value: '0deg', title: '' },
  { name: 'SkewY', value: '0deg', title: '' }
];

const animationProps = [
  { name: 'duration', value: '3s', title: 'time|initial|inherit' },
  { name: 'timing', value: 'linear', title: 'linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|steps(int,start|end)|cubic-bezier(n,n,n,n)|initial|inherit' },
  { name: 'delay', value: '0s', title: 'time|initial|inherit' },
  { name: 'iteration', value: '1', title: 'number|infinite|initial|inherit' },
  { name: 'direction', value: 'normal', title: 'normal|reverse|alternate|alternate-reverse|initial|inherit' },
  { name: 'fill-mode', value: 'none', title: 'none|forwards|backwards|both|initial|inherit' },
];

export default function Animation ({ selectedElemnt }) {

  const [animProps, setAnimProps] = useState({
    duration: '3s', timing: 'linear', delay: '0s', iteration: '1', direction: 'normal',
    'fill-mode': 'none'
  });

  const [transformProps, setTansformProps] = useState({
    scaleX: '1', scaleY: '1', TranslateX: '0px', TranslateY: '0px',
    rotateX: '0deg', rotateY: '0deg', SkewX: '0deg', SkewY: '0deg'
  });

  const [state, setState] = useState({
    isTransOpen: true, isAnimOpen: true
  });

  const onTansPropsChange = (e) => {
    setTansformProps({ ...transformProps, [e.target.name]: e.target.value });
  }

  const onAnimPropsChange = (e) => {
    setAnimProps({ ...animProps, [e.target.name]: e.target.value });
  }

  const onPlay = () => {
    removeElement('box-custom-anim');
    selectedElemnt.style = null;

    let initP = Object.keys(transformProps).reduce((a, c) => {
      a += c === 'scaleY' || c === 'scaleX' ? (c + '(1) ') : (c + '(0) ');
      return a;
    }, '');

    let strTrans = Object.keys(transformProps).reduce((a, c) => {
      a += c + '(' + transformProps[c] + ') ';
      return a
    }, '');

    let style = document.createElement('style');
    style.id = 'box-custom-anim';
    style.rel = "stylesheet";

    let animId = 'anim-' + Date.now();

    style.innerHTML = (`@keyframes ${animId} {\
      from { transform: ${initP};   }
      to   { transform: ${strTrans}; }
    }`);

    document.getElementsByTagName('head')[0].appendChild(style);

    let strAnim = Object.keys(animProps).reduce((a, c) => { a += (animProps[c] + ' '); return a }, '');
    selectedElemnt.style.animation = `${animId} ${strAnim}`;

  }

  const onExpand = (val) => {
    if (val === 1) {
      setState({ ...state, isAnimOpen: !state.isAnimOpen });
    }
    else setState({ ...state, isTransOpen: !state.isTransOpen });
  }

  return (<div className="w-100 list-anims">

    <h4 onClick={() => { onExpand(0) }}>Transform props</h4>
    {state.isTransOpen
      && <ul className="w-100">
        {trnsformProps.map(tns => <li className="w-100 vertical-center" key={tns.name} title={tns.title}>
          <span>{tns.name}</span>
          <input type="text" name={tns.name} onChange={onTansPropsChange} placeholder={tns.value} />
        </li>)}
      </ul>}

    <h4 onClick={() => { onExpand(1) }}>animation props</h4>
    {state.isAnimOpen
      && <ul className="w-100">
        {animationProps.map(tns => <li className="w-100 vertical-center" key={tns.name} title={tns.title}>
          <span>{tns.name}</span>
          <input type="text" name={tns.name} onChange={onAnimPropsChange} placeholder={tns.value} />
        </li>)}
      </ul>}

    <button onClick={onPlay} className="w-100 vertical-center"><svg xmlns="http://www.w3.org/2000/svg" className="mr-10p" width="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>Play</button>
  </div>);
}