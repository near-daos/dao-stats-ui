import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import { SvgIcon } from '../svgIcon/svgIcon';

import styles from './search.module.scss';

export interface SearchProps {
  disabled?: boolean;
  className?: string;
  classNameInput?: string;
  classNameIcon?: string;
  value?: string;
  inputProps?: Partial<InputHTMLAttributes<HTMLInputElement>>;
}

export const Search: React.FC<SearchProps> = ({
  className,
  classNameInput,
  classNameIcon,
  value = '',
  inputProps,
  disabled,
}) => (
  <div
    className={clsx(styles.root, className, {
      [styles.disabled]: disabled,
      [styles.forceActive]: value?.trim() !== '',
    })}
  >
    <input
      {...inputProps}
      id="search"
      type="text"
      className={clsx(styles.input, classNameInput, {
        [styles.disabled]: disabled,
      })}
      placeholder="Search by Dao Name"
      disabled={disabled}
    />
    <label htmlFor="search" className={styles.inputLabel} />

    <SvgIcon icon="search" className={clsx(styles.inputIcon, classNameIcon)} />

    <div className={styles.inputControl}>
      <a
        href={process.env.REACT_APP_MAINNET || '/'}
        className={clsx(styles.inputControlItem, {
          [styles.active]:
            window.location.origin === process.env.REACT_APP_MAINNET,
        })}
      >
        Mainnet
      </a>

      <a
        href={process.env.REACT_APP_TESTNET || '/'}
        className={clsx(styles.inputControlItem, {
          [styles.active]:
            window.location.origin === process.env.REACT_APP_TESTNET,
        })}
      >
        Testnet
      </a>
    </div>
  </div>
);

export default Search;
