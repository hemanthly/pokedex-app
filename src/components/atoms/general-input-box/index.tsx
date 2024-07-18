import React from 'react';

const GeneralInputBox = ({
  label = 'Label',
  placeholder = 'Enter text',
  value = '',
  onChange = () => {},
  onKeyDown = () => {},
  className = '',
  id = 'general-input' 
}) => {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <label htmlFor={id} className='text-[12px] text-sm ml-1 hidden md:block'>
        {label}
      </label>
      <input
        type="text"
        id={id} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className='bg-filterbg p-3 rounded-md'
      />
    </div>
  );
};

export default GeneralInputBox;
