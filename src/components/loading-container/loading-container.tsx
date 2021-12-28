import React, { FC } from 'react';
import clsx from 'clsx';
import { Loading } from '../loading';

import styles from './loading-container.module.scss';

export type LoadingContainerProps = {
  className?: string;
  loadingClassName?: string;
  hide?: boolean;
};

export const LoadingContainer: FC<LoadingContainerProps> = ({
  className,
  loadingClassName,
  hide,
}) => (
  <div
    className={clsx(styles.loadingContainer, className, {
      [styles.hide]: hide,
    })}
  >
    <Loading className={loadingClassName} />
  </div>
);
