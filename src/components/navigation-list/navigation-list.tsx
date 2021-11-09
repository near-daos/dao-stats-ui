import React, { FC } from 'react';
import clsx from 'clsx';

import styles from './navigation-list.module.scss';

export type NavigationListProps = {
  className?: string;
  title: string;
  options: Option[];
  selectedOption: Option;
  onSelect: (value: string) => null;
};

type Option = {
  value: string;
  label: string;
};

export const NavigationList: FC<NavigationListProps> = ({
  className,
  title,
  options,
  selectedOption,
  onSelect,
}) => (
  <div className={clsx(styles.navigationList, className)}>
    <div className={styles.title}>{title}</div>
    <ul className={styles.list}>
      {options.map((option) => (
        <li
          key={option.value}
          className={clsx(
            { [styles.active]: selectedOption.value === option.value },
            styles.item,
          )}
        >
          <button
            onClick={() => onSelect(option.value)}
            className={styles.button}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  </div>
);
