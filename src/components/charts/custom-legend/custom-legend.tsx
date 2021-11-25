import React, { ReactElement } from 'react';

import { LegendProps } from 'recharts';
import { Dot } from '../svg/dot';
import { RangeFilter, RangeFilterProps } from '../range-filter';

import styles from './custom-legend.module.scss';

export const CustomLegend = ({
  payload,
  period,
  setPeriod,
}: LegendProps & RangeFilterProps): ReactElement => (
  <div className={styles.legend}>
    <ul className={styles.legendList}>
      {payload?.map((entry) => (
        <li className={styles.legendListBar} key={`item-${entry.value}`}>
          <Dot color={entry.color || ''} className={styles.legendListSvg} />
          <span className={styles.legendListValue}>{entry.value}</span>
        </li>
      ))}
    </ul>
    <RangeFilter
      period={period}
      setPeriod={setPeriod}
      periods={['7d', '1m', '3m', '6m', '1y', 'All']}
    />
  </div>
);
