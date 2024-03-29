import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { TooltipProps } from 'recharts';
import numeral from 'numeral';
import { formatDate } from 'src/utils';
import { SvgIcon } from '../../svgIcon';
import { Dot } from '../svg/dot';

import { LineItem } from '../types';

import styles from './chart-tooltip.module.scss';

export interface ChartTooltipProps extends TooltipProps<number, string> {
  showArrow?: boolean;
  lines?: LineItem[];
  isCurrency?: boolean;
  isNear?: boolean;
  roundPattern?: string;
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
  isCurrency,
  roundPattern = '0,0',
  isNear,
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
      <p className={styles.label}>{formatDate(label, 'EEEE, LLL d, yyyy')}</p>
      {payload.map((element, elementIndex) => (
        <div
          className={styles.element}
          key={`item-${element.dataKey}-${element.value}`}
        >
          <Dot color={element.color || ''} className={styles.dot} />
          <span className={styles.name}>
            {lines ? lines[elementIndex].name : element.name} :
          </span>
          <span className={styles.value}>
            {isCurrency ? '$' : null}{' '}
            {numeral(element.value).format(roundPattern)}
            {isNear ? (
              <SvgIcon icon="near" className={styles.nearIcon} />
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
};
