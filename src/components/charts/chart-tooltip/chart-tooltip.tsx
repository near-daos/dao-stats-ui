import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { TooltipProps } from 'recharts';
import format from 'date-fns/format';
import numeral from 'numeral';

import { Dot } from '../svg/dot';

import { LineItem } from '../types';

import styles from './chart-tooltip.module.scss';

export interface ChartTooltipProps extends TooltipProps<number, string> {
  showArrow?: boolean;
  lines?: LineItem[];
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  label,
  viewBox,
  coordinate,
  offset,
  showArrow,
  lines,
}) => {
  const [arrowPosition, setArrowPosition] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  const tooltipWidth = rootRef.current?.offsetWidth;

  const findArrowPosition = () => {
    let arrow = '';

    if (tooltipWidth && viewBox?.width && coordinate?.x && offset) {
      const toolTipX = coordinate?.x;

      if (viewBox.width - tooltipWidth > toolTipX - offset) arrow = 'left';
      else arrow = 'right';
    }

    return setArrowPosition(arrow);
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
      <p className={styles.label}>
        {format(new Date(label), 'EEEE, LLL d, yyyy')}
      </p>
      {payload.map((element, elementIndex) => (
        <div key={`item-${element.dataKey}-${element.value}`}>
          <Dot color={element.color || ''} className={styles.dot} />
          <span className={styles.name}>
            {lines ? lines[elementIndex].name : element.name}:
          </span>
          <span className={styles.value}>
            {numeral(element.value).format('0,0')}
          </span>
        </div>
      ))}
    </div>
  );
};
