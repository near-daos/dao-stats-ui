import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './widget-tile.module.scss';

type WidgetTileProps = {
  className?: string;
  active?: boolean;
};

export const WidgetTile: FC<WidgetTileProps> = ({
  children,
  className,
  active = false,
}) => (
  <div
    className={clsx(styles.widgetTile, { [styles.active]: active }, className)}
  >
    {children}
  </div>
);
