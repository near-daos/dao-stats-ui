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
    {data.map(({ value }, index: number) => (
      <div
        key={value}
        style={{ width: `${value}%`, background: COLORS[index] }}
        className={styles.stack}
      >
        <div className={styles.value}>{value}%</div>
      </div>
    ))}
  </div>
);
