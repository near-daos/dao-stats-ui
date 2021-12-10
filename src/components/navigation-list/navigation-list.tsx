/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC } from 'react';
import clsx from 'clsx';

import styles from './navigation-list.module.scss';

export type NavigationListProps = {
  className?: string;
  title: string;
  options: NavigationItem[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  setIsOpened: (value: boolean) => void;
};

type NavigationItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

export const NavigationList: FC<NavigationListProps> = ({
  className,
  title,
  options,
  selectedValue,
  onSelect,
  setIsOpened,
}) => (
  <div className={clsx(styles.navigationList, className)}>
    <div className={styles.title}>{title}</div>
    <ul className={styles.list}>
      {options.map((option) => (
        <li
          key={option.value}
          className={clsx(
            {
              [styles.active]: selectedValue?.startsWith(option.value),
              [styles.disabled]: option.disabled,
            },
            styles.item,
          )}
          onClick={() => setIsOpened(false)}
        >
          <button
            onClick={() => onSelect(option.value)}
            className={styles.button}
          >
            {option.label}
            {option.disabled ? (
              <div className={styles.comingSoon}>(Coming soon)</div>
            ) : null}
          </button>
        </li>
      ))}
    </ul>
  </div>
);
