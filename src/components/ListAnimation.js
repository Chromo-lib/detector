import React, { useState } from 'react';
import Accordian from './Accordian';

const trnsformProps = [
  { name: 'scaleX', value: 1.9, unit: '(number)' },
  { name: 'scaleY', value: 1, unit: '(number)' },
  { name: 'translateX', value: 0, unit: '(px)' },
  { name: 'translateY', value: 0, unit: '(px)' },
  { name: 'rotateX', value: 0, unit: '(deg)' },
  { name: 'rotateY', value: 0, unit: '(deg)' },
  { name: 'skewX', value: 0, unit: '(deg)' },
  { name: 'skewY', value: 0, unit: '(deg)' }
];

const animationProps = [
  { name: 'duration', value: 3000, unit: '(s)', title: 'time in seconds (1000 = 1s)' },
  { name: 'easing', value: 'linear', unit: '(text)', title: 'linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n)|initial|inherit' },
  { name: 'delay', value: 1000, unit: '(s)', title: 'time ins seconds (1000 = 1s)' },
  { name: 'iterations', value: 1, unit: '(number)', title: 'number of iterations' },
  { name: 'direction', value: 'normal', unit: '(text)', title: 'normal|reverse|alternate|alternate-reverse|initial|inherit' },
  { name: 'fill', value: 'none', unit: '(text)', title: 'none|forwards|backwards|both|initial|inherit' },
];

export default function ListAnimation ({ selectedElemnt }) {

  const [animProps, setAnimProps] = useState({
    duration: 3000, easing: 'linear', delay: 0, iterations: 1, direction: 'normal', fill: 'none'
  });

  const [transformProps, setTansformProps] = useState({
    scaleX: 1.9, scaleY: 1, translateX: 0, translateY: 0,
    rotateX: 0, rotateY: 0, skewX: 0, skewY: 0
  });

  const [state, setState] = useState({ animName: null, isPlayin: false, isPaused: false });

  const onTansPropsChange = (e) => {
    setTansformProps({ ...transformProps, [e.target.name]: +e.target.value });
  }

  const onAnimPropsChange = (e) => {
    let anp = ['duration', 'delay', 'iterations'];
    let name = e.target.name;
    let val = e.target.value;

    if (anp.includes(name)) {
      val = parseInt(val, 10);
    }
    setAnimProps({ ...animProps, [e.target.name]: val });
  }

  const onPlay = () => {
    try {
      const formatTns = (transformObj, initVal = true) => {
        return Object.keys(transformObj).reduce((a, c) => {
          if (c.includes('scale')) {
            a += initVal ? (c + '(1) ') : `${c}(${transformProps[c]}) `;
          }

          if (c.includes('translate')) {
            a += initVal ? (c + '(0px) ') : `${c}(${transformProps[c]}px) `;
          }

          if (c.includes('rotate') || c.includes('skew')) {
            a += initVal ? (c + '(0deg) ') : `${c}(${transformProps[c]}deg) `;
          }

          return a;
        }, '');
      }

      let animName = selectedElemnt.animate(
        [
          { transform: formatTns(transformProps) },
          { transform: formatTns(transformProps, false) }
        ],
        {
          ...animProps
        });

      setState({ ...state, animName, isPlayin: true });

      animName.onfinish = function () {
        setState({ ...state, animName, isPlayin: false, isPaused: false });
      };

    } catch (error) {

    }
  }

  const onPauseOrResume = () => {
    if (state.isPaused) {
      state.animName.play();
      setState({ ...state, isPaused: false, isPlayin: true });
    }
    else {
      state.animName.pause();
      setState({ ...state, isPaused: true, isPlayin: false });
    }
  }

  return (<div className="w-100 slideLeft">

    <div className="w-100 list-styles">
      <Accordian title="Transform props">
        {trnsformProps.map(tns => <li className="w-100 vertical-center" key={tns.name}>
          <span className="disp-flex">{tns.name} {tns.unit}</span>
          <input type="text" name={tns.name} onChange={onTansPropsChange} defaultValue={tns.value} />
        </li>)}
      </Accordian>

      <Accordian title="animation props">
        {animationProps.map(tns => <li className="w-100 vertical-center" key={tns.name} title={tns.title}>
          <span className="disp-flex">{tns.name} {tns.unit}</span>
          <input type="text" name={tns.name} onChange={onAnimPropsChange} defaultValue={tns.value} />
        </li>)}
      </Accordian>
    </div>

    <div className="vertical-center column-2 padd-5">
      {state.isPlayin && !state.isPaused
        && <button onClick={onPauseOrResume} className="vertical-center bg-rose"><svg xmlns="http://www.w3.org/2000/svg" className="mr-10p" width="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>Pause</button>}

      {state.isPaused && !state.isPlayin
        && <button onClick={onPauseOrResume} className="vertical-center bg-rose"><svg xmlns="http://www.w3.org/2000/svg" className="mr-10p" width="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>Resume</button>}

      {!state.isPlayin && !state.isPaused
        && <button onClick={onPlay} className="vertical-center bg-rose"><svg xmlns="http://www.w3.org/2000/svg" className="mr-10p" width="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>Play</button>}
    </div>
  </div>);
}