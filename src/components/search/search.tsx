import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import { SvgIcon } from '../svgIcon/svgIcon';

import { NetworkSwitcher } from '../network-switcher';

import styles from './search.module.scss';

export interface SearchProps {
  disabled?: boolean;
  className?: string;
  classNameInput?: string;
  classNameIcon?: string;
  value?: string;
  inputProps?: Partial<InputHTMLAttributes<HTMLInputElement>>;
  onCloseClick: () => void;
  isShowCloseIcon?: boolean;
}

export const Search: React.FC<SearchProps> = ({
  className,
  classNameInput,
  classNameIcon,
  value = '',
  inputProps,
  disabled,
  onCloseClick,
  isShowCloseIcon,
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

    {isShowCloseIcon ? (
      <button
        type="button"
        onClick={onCloseClick}
        className={styles.closeButton}
      >
        <SvgIcon icon="close" className={styles.closeIcon} />
      </button>
    ) : null}

    <label htmlFor="search" className={styles.inputLabel} />

    <SvgIcon icon="search" className={clsx(styles.inputIcon, classNameIcon)} />

    <NetworkSwitcher className={styles.networkSwitcher} />
  </div>
);

export default Search;
