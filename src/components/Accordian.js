import React, { useState } from 'react';
import DotsVerticalIcon from '../icons/DotsVerticalIcon';
import ExpandIcon from '../icons/ExpandIcon';

export default function Accordian ({ children, title }) {

  const [active, setActive] = useState(false);

  return (
    <div className="accordian">
      <h4 className="w-100 vertical-center justify-between" onClick={() => { setActive(!active) }}>
        <DotsVerticalIcon text={title} />
        <ExpandIcon status={active} />
      </h4>

      <ul className={"w-100 " + (active ? 'slideDown' : 'disp-none')}>
        {children}
      </ul>
    </div>
  );
}