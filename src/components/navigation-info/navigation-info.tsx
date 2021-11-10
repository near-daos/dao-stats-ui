import React, { FC } from 'react';
import clsx from 'clsx';

import styles from './navigation-info.module.scss';

export type NavigationInfoProps = {
  className?: string;
  title: string;
  description: string;
  color?: 'grey' | 'blue' | 'yellow';
  direction?: 'right' | 'left';
};

export const NavigationInfo: FC<NavigationInfoProps> = ({
  className,
  title,
  description,
  color = '',
  direction = 'right',
}) => (
  <div
    className={clsx(
      styles.navigationInfo,
      styles[color],
      styles[direction],
      className,
    )}
  >
    <div className={styles.title}>{title}</div>
    <div className={styles.description}>{description}</div>
  </div>
);
