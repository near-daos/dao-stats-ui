import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './widget-tile.module.scss';

type WidgetTileProps = {
  className?: string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

export const WidgetTile: FC<WidgetTileProps> = ({
  children,
  className,
  active = false,
  onClick,
  disabled,
}) => (
  <button
    type="button"
    className={clsx(
      styles.widgetTile,
      {
        [styles.disabled]: disabled,
        [styles.active]: active,
        [styles.withoutHover]: !onClick,
      },
      className,
    )}
    onClick={onClick}
  >
    {children}
  </button>
);
