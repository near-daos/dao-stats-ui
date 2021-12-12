import React, { FC } from 'react';
import clsx from 'clsx';

import styles from './range-filter.module.scss';
import { Dropdown } from '../../dropdown';

export type PeriodType = '7d' | '1m' | '3m' | '6m' | '1y' | 'All' | string;

export interface RangeFilterProps {
  periods?: PeriodType[];
  period: string;
  setPeriod: (type: PeriodType) => void;
}

export const RangeFilter: FC<RangeFilterProps> = ({
  periods = [],
  period,
  setPeriod,
}) => {
  console.log(
    periods.map(() => ({
      id: period,
      value: period,
      label: period,
    })),
  );

  return (
    <div className={styles.list}>
      {/* <Dropdown
        options={periods.map((periodItem) => ({
          id: periodItem,
          value: periodItem,
          label: periodItem,
        }))}
        initialSelectedItem={{ label: period, id: period, value: period }}
      /> */}

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
  );
};
