import React, { FC, HTMLProps } from 'react';
import clsx from 'clsx';

import styles from './table.module.scss';

export const Cell: FC<HTMLProps<HTMLTableCellElement>> = ({
  children,
  className,
  ...props
}) => (
  <td className={clsx(styles.cell, className)} {...props}>
    <div className={styles.cellWrapper}>{children}</div>
  </td>
);
