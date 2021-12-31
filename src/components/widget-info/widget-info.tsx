import React, { FC } from 'react';
import clsx from 'clsx';
import { numberWithCommas, bigNumber } from 'src/utils';
import { IconName, SvgIcon } from '../svgIcon';

import styles from './widget-info.module.scss';

type WidgetInfoProps = {
  className?: string;
  title: string;
  percentages?: number;
  number?: number;
  totalIn?: number;
  totalOut?: number;
  icon?: IconName;
  near?: boolean;
};

export const WidgetInfo: FC<WidgetInfoProps> = ({
  className,
  title,
  percentages = 0,
  number,
  totalIn,
  totalOut,
  icon,
  near,
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
        {near ? (
          <div>
            <div>{bigNumber(String(number))[0]}</div>
            <div className={styles.secondPartNearValue}>
              {bigNumber(String(number))[1]}
              {icon ? (
                <SvgIcon icon={icon} className={styles.nearIcon} />
              ) : null}
            </div>
          </div>
        ) : (
          numberWithCommas(String(number))
        )}
        {/* {icon ? <SvgIcon icon={icon} className={styles.icon} /> : null} */}
      </div>
    )}
    {totalIn && totalOut && (
      <div className={styles.number}>
        <span className={styles.totalIn}>
          {numberWithCommas(String(totalIn))}
        </span>
        /
        <span className={styles.totalOut}>
          {numberWithCommas(String(totalOut))}
        </span>
        {icon ? <SvgIcon icon={icon} className={styles.icon} /> : null}
      </div>
    )}
  </div>
);
