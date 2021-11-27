import React, { FC } from 'react';
import styles from './stacked-chart.module.scss';
import { COLORS } from '../constants';

const data = [
  {
    value: 47,
  },
  {
    value: 35,
  },
  {
    value: 1,
  },
  {
    value: 17,
  },
];

export const StackedChart: FC = () => (
  <div className={styles.stackedChart}>
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
