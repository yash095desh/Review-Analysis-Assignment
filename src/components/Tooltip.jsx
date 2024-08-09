import React from 'react';

const Tooltip = ({ text, position }) => {

  return (
    <div className={` absolute top-[${position.y} left-[${position.x} bg-[#333] text-white p-2 rounded-md text-[14px] pointer-events-none ]]`}>
      {text}
    </div>
  );
};

export default Tooltip;