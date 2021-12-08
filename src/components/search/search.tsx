import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import { SvgIcon } from '../svgIcon/svgIcon';
import { NETWORKS } from '../../constants';

import styles from './search.module.scss';

export interface SearchProps {
  className?: string;
  classNameInput?: string;
  classNameIcon?: string;
  value?: string;
  inputProps?: Partial<InputHTMLAttributes<HTMLInputElement>>;
  setSearchType: (network: NETWORKS) => void;
  searchType: NETWORKS;
}

export const Search: React.FC<SearchProps> = ({
  className,
  classNameInput,
  classNameIcon,
  value = '',
  inputProps,
  setSearchType,
  searchType,
}) => (
  <div
    className={clsx(styles.root, className, {
      [styles.forceActive]: value?.trim() !== '',
    })}
  >
    <input
      {...inputProps}
      id="search"
      type="text"
      className={clsx(styles.input, classNameInput)}
      placeholder="Search by Dao Name"
    />
    <label htmlFor="search" className={styles.inputLabel} />

    <SvgIcon icon="search" className={clsx(styles.inputIcon, classNameIcon)} />

    <div className={styles.inputControl}>
      <button
        type="button"
        className={clsx(styles.inputControlItem, {
          [styles.active]: searchType === NETWORKS.Mainnet,
        })}
        onClick={() => setSearchType(NETWORKS.Mainnet)}
      >
        Mainnet
      </button>

      <button
        type="button"
        className={clsx(styles.inputControlItem, {
          [styles.active]: searchType === NETWORKS.Testnet,
        })}
        onClick={() => setSearchType(NETWORKS.Testnet)}
      >
        Testnet
      </button>
    </div>
  </div>
);

export default Search;
