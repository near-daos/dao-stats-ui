import React, { FC } from 'react';
import clsx from 'clsx';
import { TotalMetrics } from 'src/api';

import { SvgIcon } from '../../svgIcon';

import styles from './amount.module.scss';

export const Amount: FC<TotalMetrics> = ({ count, growth }) => (
  <div className={styles.amount}>
    <div className={styles.label}>{count}</div>
    {growth ? (
      <div
        className={clsx(styles.percentages, {
          [styles.negativeGrowth]: growth < 0,
        })}
      >
        <SvgIcon icon="stats" className={styles.icon} />
        {growth}%
      </div>
    ) : null}
  </div>
);
