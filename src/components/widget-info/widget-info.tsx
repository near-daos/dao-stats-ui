import React, { FC } from 'react';
import clsx from 'clsx';
import { numberWithCommas } from 'src/utils';
import { IconName, SvgIcon } from '../svgIcon';

import styles from './widget-info.module.scss';

type WidgetInfoProps = {
  className?: string;
  title: string;
  percentages?: number;
  number?: number;
  icon?: IconName;
};

export const WidgetInfo: FC<WidgetInfoProps> = ({
  className,
  title,
  percentages = 0,
  number,
  icon,
}) => (
  <div className={clsx(styles.widgetInfo, className)}>
    <div className={styles.top}>
      <div className={styles.title}>{title}</div>
      {percentages ? (
        <div
          className={clsx(styles.percentages, {
            [styles.negativeGrowth]: percentages < 0,
            // [styles.zeroGrowth]: percentages === 0,
          })}
        >
          <SvgIcon icon="stats" className={styles.icon} />
          {percentages}%
        </div>
      ) : null}
    </div>
    {number ? (
      <div className={styles.number}>
        {numberWithCommas(String(number))}
        {icon ? <SvgIcon icon={icon} className={styles.icon} /> : null}
      </div>
    ) : null}
  </div>
);
