import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import { SvgIcon } from '../svgIcon/svgIcon';

import s from './search.module.scss';

export interface SearchProps {
  className?: string;
  value?: string;
  inputProps?: Partial<InputHTMLAttributes<HTMLInputElement>>;
  setSearchType: (type: 'mainnet' | 'testnet') => void;
  searchType: 'mainnet' | 'testnet';
}

export const Search: React.FC<SearchProps> = ({
  className,
  value,
  inputProps,
  setSearchType,
  searchType,
}) => (
  <div
    className={clsx(s.inputWrapper, className, {
      [s.forceActive]: value?.trim() !== '',
    })}
  >
    <input
      {...inputProps}
      id="search"
      type="text"
      className={s.input}
      placeholder="Search"
    />
    <label htmlFor="search" className={s.inputLabel} />

    <SvgIcon icon="search" className={s.inputIcon} />

    <div className={s.inputControl}>
      <button
        type="button"
        className={clsx(s.inputControlItem, {
          [s.active]: searchType === 'mainnet',
        })}
        onClick={() => setSearchType('mainnet')}
      >
        Mainnet
      </button>

      <button
        type="button"
        className={clsx(s.inputControlItem, {
          [s.active]: searchType === 'testnet',
        })}
        onClick={() => setSearchType('testnet')}
      >
        Testnet
      </button>
    </div>
  </div>
);

export default Search;
