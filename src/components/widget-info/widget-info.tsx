import React, { FC } from 'react';
import clsx from 'clsx';
import numeral from 'numeral';
import { IconName, SvgIcon } from '../svgIcon';

import styles from './widget-info.module.scss';

type WidgetInfoProps = {
  className?: string;
  title: string;
  percentages?: number;
  number?: number;
  icon?: IconName;
  isRoundNumber?: boolean;
  isCurrency?: boolean;
};

export const WidgetInfo: FC<WidgetInfoProps> = ({
  className,
  title,
  percentages = 0,
  number,
  icon,
  isRoundNumber,
  isCurrency,
}) => (
  <div className={clsx(styles.widgetInfo, className)}>
    <div className={styles.top}>
      <div className={styles.title}>{title}</div>
      {percentages ? (
        <div
          className={clsx(styles.percentages, {
            [styles.negativeGrowth]: percentages < 0,
          })}
        >
          <SvgIcon icon="stats" className={styles.icon} />
          {percentages}%
        </div>
      ) : null}
    </div>
    {number && (
      <div className={styles.number}>
        {isCurrency ? '$' : ''}
        {isRoundNumber ? numeral(number).format('0,0') : number}
        {icon ? <SvgIcon icon={icon} className={styles.icon} /> : null}
      </div>
    )}
  </div>
);
