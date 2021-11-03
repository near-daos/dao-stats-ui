import React, { useState } from 'react';
import clsx from 'clsx';

import { SvgIcon } from '../svgIcon/svgIcon';

import s from './search.module.scss';

export interface SearchProps {
  className?: string;
  onChange?: (id: string) => void;
}

export const Search: React.FC<SearchProps> = ({ className, onChange }) => {
  const [activeNet, setActiveNet] = useState('mainnet');
  const [searchValue, setSearchValue] = useState('');

  return (
    <div
      className={clsx(s.inputWrapper, className, {
        [s.forceActive]: searchValue.trim() !== '',
      })}
    >
      <input
        id="search"
        type="text"
        className={s.input}
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <label htmlFor="search" className={s.inputLabel} />

      <SvgIcon icon="search" className={s.inputIcon} />

      <div className={s.inputControl}>
        <button
          type="button"
          className={clsx(s.inputControlItem, {
            [s.active]: activeNet === 'mainnet',
          })}
          onClick={() => setActiveNet('mainnet')}
        >
          Mainnet
        </button>

        <button
          type="button"
          className={clsx(s.inputControlItem, {
            [s.active]: activeNet === 'testnet',
          })}
          onClick={() => setActiveNet('testnet')}
        >
          Testnet
        </button>
      </div>
    </div>
  );
};

export default Search;
