import clsx from 'clsx';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { TooltipProps } from 'recharts';

import { Dot } from '../svg/dot';

import styles from './chart-tooltip.module.scss';

export interface ChartTooltipProps extends TooltipProps<number, string> {
  showArrow?: boolean;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  label,
  viewBox,
  coordinate,
  offset,
  showArrow,
}) => {
  const [arrowPosition, setArrowPosition] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  const tooltipWidth = rootRef.current?.offsetWidth;

  const findArrowPosition = () => {
    let arrowPsn = '';

    if (tooltipWidth && viewBox?.width && coordinate?.x && offset) {
      const x = coordinate?.x - offset;

      if (viewBox.width - tooltipWidth > x) arrowPsn = 'left';
      else arrowPsn = 'right';
    }

    return setArrowPosition(arrowPsn);
  };

  useEffect(() => {
    if (showArrow) findArrowPosition();
  });

  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div
      className={clsx(styles.tooltip, {
        [styles.arrowLeft]: arrowPosition === 'left',
        [styles.arrowRight]: arrowPosition === 'right',
      })}
      ref={rootRef}
    >
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
