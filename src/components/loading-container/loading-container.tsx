import React, { FC } from 'react';
import clsx from 'clsx';
import { Loading } from '../loading';

import styles from './loading-container.module.scss';

export type LoadingContainerProps = {
  className?: string;
  hide: boolean;
};

export const LoadingContainer: FC<LoadingContainerProps> = ({
  className,
  hide,
}) => (
  <div
    className={clsx(styles.loadingContainer, className, {
      [styles.hide]: hide,
    })}
  >
    <Loading />
  </div>
);
