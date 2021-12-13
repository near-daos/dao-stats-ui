import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import { SvgIcon } from '../svgIcon/svgIcon';

import styles from './search.module.scss';
import { NetworkSwitcher } from '../network-switcher';

export interface SearchProps {
  disabled?: boolean;
  className?: string;
  classNameInput?: string;
  classNameIcon?: string;
  value?: string;
  networkSwitcherClass?: string;
  inputProps?: Partial<InputHTMLAttributes<HTMLInputElement>>;
}

export const Search: React.FC<SearchProps> = ({
  className,
  classNameInput,
  classNameIcon,
  value = '',
  inputProps,
  disabled,
  networkSwitcherClass,
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

    <NetworkSwitcher className={networkSwitcherClass} />
  </div>
);

export default Search;
