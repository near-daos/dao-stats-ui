import React, { ReactNode } from 'react';
import { TooltipProps } from 'recharts';

import { Dot } from '../svg/dot';

import styles from './chart-tooltip.module.scss';

export const ChartTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>): ReactNode => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className={styles.tooltip}>
      <p className={styles.label}>{label}</p>
      {payload.map((element) => (
        <div key={`item-${element.dataKey}-${element.value}`}>
          <Dot color={element.color || ''} className={styles.dot} />
          <span className={styles.name}>{element.name}:</span>
          <span className={styles.value}>${element.value}</span>
        </div>
      ))}
    </div>
  );
};
