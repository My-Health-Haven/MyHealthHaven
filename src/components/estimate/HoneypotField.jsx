'use client';
import React from 'react';

const HoneypotField = ({ value, onChange }) => (
  <input
    type='text'
    name='website'
    value={value}
    onChange={onChange}
    autoComplete='off'
    tabIndex={-1}
    aria-hidden='true'
    style={{
      position: 'absolute',
      left: '-9999px',
      width: 0,
      height: 0,
      opacity: 0,
      pointerEvents: 'none',
    }}
  />
);

export default HoneypotField;
