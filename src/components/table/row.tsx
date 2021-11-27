import React, { FC, HTMLProps } from 'react';
import clsx from 'clsx';

import styles from './table.module.scss';

export const Row: FC<HTMLProps<HTMLTableRowElement>> = ({
  children,
  className,
  ...props
}) => (
  <tr className={clsx(styles.row, className)} {...props}>
    {children}
  </tr>
);
