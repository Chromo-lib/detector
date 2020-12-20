import React from 'react';

const inputs = ['fill', 'stroke', 'shadow', 'no color'];

export default function MenuColors ({onInputColor}) {

  return (<ul className="d-flex">
    {inputs.map(c => {
      if (c === 'no color') {
        return <li className="horizontal-align" key={c}>
          <span className="fs-12">{c}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="44" height="23" viewBox="0 0 17 15">
            <g stroke="#F00000" fill="none" fill-rule="evenodd">
              <path d="M.5.5h16v14H.5z" />
              <path d="M1 1l15 13" stroke-linecap="square" />
              <path d="M1 14L16 1" stroke-linecap="square" />
            </g>
          </svg>
        </li>
      }
      return <li className="horizontal-align" key={c}>
        <span className="fs-12">{c}</span>
        <input type="color" name={c} onChange={onInputColor} />
      </li>
    })}
  </ul>);
}