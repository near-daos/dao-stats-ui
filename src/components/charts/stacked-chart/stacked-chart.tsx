import React, { FC } from 'react';
import clsx from 'clsx';

import { COLORS } from '../constants';
import { Proposals } from '../../../api';

import styles from './stacked-chart.module.scss';

export type StackedChartProps = {
  proposals?: Proposals;
  className?: string;
};

export const StackedChart: FC<StackedChartProps> = ({
  proposals = { payout: 0, councilMember: 0, policyChange: 0, expired: 0 },
  className,
}) => (
  <div className={clsx(styles.stackedChart, className)}>
    <div className={styles.barWrapper}>
      {Object.values(proposals)?.map(
        (value, index) =>
          value !== 0 && (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={value + index}
              style={{ background: COLORS[index], width: `${value}%` }}
              className={styles.stack}
            />
          ),
      )}
    </div>
    <div className={styles.valuesWrapper}>
      {Object.values(proposals).map((value, index) => (
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
