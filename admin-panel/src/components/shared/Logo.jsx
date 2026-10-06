import React from 'react';
import { CrownOutlined } from '@ant-design/icons';

function Logo({ className = '', iconSize = 32, textColor = 'white' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <CrownOutlined
        style={{ fontSize: iconSize, color: '#946244' }}
        className='drop-shadow-[0_0_8px_rgba(148,98,68,0.3)]'
      />
      <span className='flex flex-col text-left leading-[0.9]'>
        <span className={`font-bold text-2xl tracking-[0.2em] font-serif ${textColor === 'white' ? 'text-white' : 'text-bg-black'}`}>
          BETTER
        </span>
        <span className={`font-light text-[0.7rem] tracking-[0.5em] opacity-80 ${textColor === 'white' ? 'text-white' : 'text-bg-black'}`}>
          LUXURY HOTEL
        </span>
      </span>
    </div>
  );
}

export default Logo;
