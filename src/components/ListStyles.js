import React, { useState } from 'react';
import Accordian from './Accordian';
import copyToClipboard from '../utils/copyToClipboard';
import CopyCPIcon from '../icons/CopyCPIcon';

export default function ListStyles ({ data, selectedElemnt, selectedElementStyles, setSelectedElementStyles }) {

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

  if (data && data.length > 0) {
    return (<div className="w-100 list-styles">
      {data.map((d, idx) => (
        <Accordian key={idx} title={d.title}>
          {d.items.map(item => <li className="w-100 vertical-center" key={item.name}>
            <div className="disp-flex">
              <span className="cursor-p mr-5p" onClick={() => { onCopyVal(item) }} title="Copy Value">
                <CopyCPIcon status={copiedStyle && copiedStyle === item.name} />
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
                defaultValue={item.value}
              />
              : <input type="text"
                name={item.name}
                onChange={onStyleChange}
                defaultValue={item.value}
              />}

          </li>)}
        </Accordian>
      ))}
    </div>);
  }
  else {
    return <div className="w-100 vertical-center list-styles">
      <p className="txt-muted">Select an element..</p>
    </div>
  }
}