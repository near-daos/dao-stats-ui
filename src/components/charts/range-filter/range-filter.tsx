import React, { FC } from 'react';
import clsx from 'clsx';
import { Period } from 'src/constants';

import { Dropdown } from '../../dropdown';

import styles from './range-filter.module.scss';

export interface RangeFilterProps {
  periods?: Period[];
  period: Period;
  setPeriod: (period: Period) => void;
}

export const RangeFilter: FC<RangeFilterProps> = ({
  periods = [],
  period,
  setPeriod,
}) => (
  <div className={styles.list}>
    <Dropdown
      className={styles.dropdown}
      onChange={(option) => setPeriod(option?.value || periods[0])}
      options={periods.map((periodItem) => ({
        id: periodItem,
        value: periodItem,
        label: periodItem,
      }))}
      initialSelectedItem={{ label: period, id: period, value: period }}
    />

    <div className={styles.periods}>
      {periods.map((periodItem) => (
        <button
          key={periodItem}
          type="button"
          className={clsx(styles.button, {
            [styles.active]: period === periodItem,
          })}
          onClick={() => setPeriod(periodItem)}
        >
          {periodItem}
        </button>
      ))}
    </div>
  </div>
);
