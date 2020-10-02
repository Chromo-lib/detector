import React, { useState } from 'react';
import copyToClipboard from '../utils/copyToClipboard';

export default function Accordian ({
  title, items, selectedElemnt, selectedElementStyles, setSelectedElementStyles
}) {

  const [active, setActive] = useState(false);
  const [copiedStyle, setCopiedStyle] = useState(null);

  const onCopyVal = (item) => {
    copyToClipboard(item.value);
    setCopiedStyle(item.name);
    setTimeout(() => {
      setCopiedStyle(null);
    }, 2000);
  }

  const onStyleChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;

    console.log('key ', e.target);

    selectedElemnt.style.setProperty(name, val, "important");

    let n = selectedElementStyles.map(st => {
      let items = st.items.map(item => {
        if (item.name === name) item.value = val;
        return item
      });
      return { title: st.title, items }
    });

    setSelectedElementStyles(n);
  }

  return (
    <div className="accordian">
      <h4 className="w-100 vertical-center justify-between" onClick={() => { setActive(!active) }}>
        <span className="disp-flex"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#fff" width="16" className="mr-5p">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>{title}</span>
        <span className="fs-16 disp-flex">{active
          ? <svg xmlns="http://www.w3.org/2000/svg" width="14" fill="none" viewBox="0 0 24 24" stroke="#fff">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
          : <svg xmlns="http://www.w3.org/2000/svg" width="14" fill="none" viewBox="0 0 24 24" stroke="#fff">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>}
        </span>
      </h4>

      <ul className={"w-100 " + (active ? 'slideDown' : 'disp-none')}>
        {items.map(item => <li className="w-100 vertical-center" key={item.name}>

          <div className="disp-flex">
            <span className="cursor-p mr-5p" onClick={() => { onCopyVal(item) }} title="Copy Value">
              {copiedStyle && copiedStyle === item.name
                ? <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 20" fill="#92ff14">
                  <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                  <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                </svg>

                : <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 20" fill="#fff">
                  <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                  <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>}
            </span>

            {(item.name === 'color' || item.name === 'background-color' || item.name === 'background')
              ? <div className="w-100 disp-flex">
                <span className="mr-10p">{item.name.replace(/\-/gi, ' ')}<br />(<span>{item.value}</span>)</span>
                <span className="circle-box" style={{ backgroundColor: item.value }}></span>
              </div>

              : <span className="mr-10p">{item.name.replace(/\-/gi, ' ')}</span>}
          </div>

          {(item.name === 'color' || item.name === 'background-color' || item.name === 'background')
            ? <input type="color"
              name={item.name}
              onInput={onStyleChange}
              onChange={onStyleChange}
              placeholder={item.value}
            />
            : <input type="text"
              name={item.name}
              onChange={onStyleChange}
              placeholder={item.value}
            />}

        </li>)}
      </ul>
    </div>
  );
}