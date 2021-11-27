import React, { FC, HTMLProps } from 'react';
import clsx from 'clsx';

import styles from './table.module.scss';

type HeaderCellProps = {
  value?: string;
  position?: 'left' | 'right';
};

interface LeaderboardProps extends HTMLProps<HTMLTableElement> {
  headerCells: HeaderCellProps[];
  className?: string;
  tableBodyClassName?: string;
}

export const Table: FC<LeaderboardProps> = ({
  className,
  tableBodyClassName,
  headerCells,
  children,
}) => (
  <table
    cellPadding={0}
    cellSpacing={0}
    className={clsx(styles.table, className)}
  >
    <thead>
      <tr>
        {headerCells.map((headerCell) => (
          <th
            key={headerCell.value}
            className={clsx(styles.headerCell, {
              [styles.headerCellRight]: headerCell.position === 'right',
            })}
          >
            {headerCell.value}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className={clsx(styles.tableBody, tableBodyClassName)}>
      {children}
    </tbody>
  </table>
);
