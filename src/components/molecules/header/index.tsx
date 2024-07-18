import { POKEDEX_DESCRIPTION, POKEDEX_TITLE } from '@/utils/constants';
import React from 'react';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center w-full md:w-fit px-9 mb-2">
      <div className="flex-1 md:border-r border-b md:border-b-0 border-gray-500 pb-2 md:pb-0 md:pr-7">
        <h1 className="text-2xl font-bold tracking-widest">{POKEDEX_TITLE}</h1>
      </div>
      <div className="flex-1 pt-2 md:pt-0 md:pl-4 md:text-nowrap">
        <p>{POKEDEX_DESCRIPTION}</p>
      </div>
    </div>
  );
};

export default Header;