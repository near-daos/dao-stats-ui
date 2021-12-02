import React, { FC } from 'react';
import clsx from 'clsx';

import { COLORS } from '../constants';

import styles from './stacked-chart.module.scss';

export type StackedChartItem = {
  value: number;
};

export type StackedChartProps = {
  data: StackedChartItem[];
  className?: string;
};

export const StackedChart: FC<StackedChartProps> = ({ data, className }) => (
  <div className={clsx(styles.stackedChart, className)}>
    <div className={styles.barWrapper}>
      {data.map(
        ({ value }, index: number) =>
          value !== 0 && (
            <div
              key={value}
              style={{ background: COLORS[index], width: `${value}%` }}
              className={styles.stack}
            />
          ),
      )}
    </div>
    <div className={styles.valuesWrapper}>
      {data.map(({ value }, index: number) => (
        <div className={styles.valueContainer}>
          <div className={styles.dot} style={{ background: COLORS[index] }} />
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={value + index}
            className={styles.value}
            style={{
              width: `${value}%`,
            }}
          >
            {value}%
          </div>
        </div>
      ))}
    </div>
  </div>
);
