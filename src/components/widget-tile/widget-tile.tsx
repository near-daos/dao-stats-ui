import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './widget-tile.module.scss';

type WidgetTileProps = {
  className?: string;
  active?: boolean;
  onClick?: () => void;
};

export const WidgetTile: FC<WidgetTileProps> = ({
  children,
  className,
  active = false,
  onClick,
}) => (
  <button
    type="button"
    className={clsx(styles.widgetTile, { [styles.active]: active }, className)}
    onClick={onClick}
  >
    {children}
  </button>
);
