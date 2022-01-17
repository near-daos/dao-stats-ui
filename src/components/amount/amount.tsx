import React, { FC } from 'react';
import clsx from 'clsx';

import { SvgIcon } from '../svgIcon';

import styles from './amount.module.scss';

export type AmountProps = {
  className?: string;
  amount?: number;
  isNegativeGrowth?: boolean;
  percentages?: number;
};

export const Amount: FC<AmountProps> = ({
  className,
  amount,
  isNegativeGrowth,
  percentages,
}) => (
  <div className={clsx(styles.amount, className)}>
    <div className={styles.label}>{amount}</div>
    <div
      className={clsx(styles.percentages, {
        [styles.negativeGrowth]: isNegativeGrowth,
      })}
    >
      <SvgIcon icon="stats" className={styles.icon} />
      {(percentages || 0) * 100}%
    </div>
  </div>
);
