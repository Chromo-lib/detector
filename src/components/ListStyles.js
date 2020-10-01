import React from 'react';
import Accordian from './Accordian';


export default function ListStyles ({ data, selectedElemnt, selectedElementStyles, setSelectedElementStyles }) {

  if (data && data.length > 0) {
    return (<div className="w-100 list-styles">
      {data.map((d, idx) => (
        <Accordian key={idx} title={d.title} items={d.items}
          selectedElemnt={selectedElemnt}
          selectedElementStyles={selectedElementStyles}
          setSelectedElementStyles={setSelectedElementStyles}
        />
      ))}
    </div>);
  }
  else {
    return <div className="w-100 vertical-center list-styles">
      <p>Select an element..</p>
    </div>
  }
}