import React, { FC } from 'react';
import clsx from 'clsx';
import { SvgIcon } from '../svgIcon';

import styles from './widget-info.module.scss';

type WidgetInfoProps = {
  className?: string;
  title: string;
  percentages?: number;
  number?: string;
};

export const WidgetInfo: FC<WidgetInfoProps> = ({
  className,
  title,
  percentages,
  number,
}) => (
  <div className={clsx(styles.widgetInfo, className)}>
    <div className={styles.top}>
      <div className={styles.title}>{title}</div>
      {percentages ? (
        <div className={styles.percentages}>
          <SvgIcon icon="stats" className={styles.icon} />
          {percentages}%
        </div>
      ) : null}
    </div>
    {number ? <div className={styles.number}>{number}</div> : null}
  </div>
);
