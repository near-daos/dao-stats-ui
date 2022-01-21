import React, { FC } from 'react';
import numeral from 'numeral';
import clsx from 'clsx';
import { TotalMetrics } from 'src/api';
import { ONE_HUNDRED } from 'src/constants';

import { SvgIcon } from '../../svgIcon';

import styles from './amount.module.scss';

export type AmountProps = TotalMetrics & {
  isCurrency?: boolean;
  isPercentage?: boolean;
};

export const Amount: FC<AmountProps> = ({
  count,
  growth,
  isCurrency,
  isPercentage,
}) => (
  <div className={styles.amount}>
    <div className={styles.label}>
      {isCurrency ? '$' : ''} {numeral(count).format('0,0')}
      {isPercentage ? '%' : ''}
    </div>
    {growth ? (
      <div
        className={clsx(styles.percentages, {
          [styles.negativeGrowth]: growth < 0,
        })}
      >
        <SvgIcon icon="stats" className={styles.icon} />
        {Math.round(growth * ONE_HUNDRED)}%
      </div>
    ) : null}
  </div>
);
