import React, { FC } from 'react';

import styles from './data-table.module.scss';

type Stock = {
  totalIn: number;
  totalOut: number;
};

type Widget = {
  type: 'single' | 'double' | 'stacked';
  number: string;
  percentages: number;
  negativeGrowth?: boolean;
  stocks: Stock[];
};

type DataTableType = {
  id: number;
  type: 'sputnik' | 'dao';
  name: string;
  shortName: string;
  widget: Widget;
};

const rows: DataTableType[] = [
  {
    id: 1,
    type: 'sputnik',
    name: 'jonathan',
    shortName: '.sputnikdao.near',
    widget: {
      type: 'single',
      number: '9.',
      percentages: 10,
      stocks: [
        { totalIn: 0, totalOut: 10 },
        { totalIn: 10, totalOut: 20 },
        { totalIn: 20, totalOut: 30 },
      ],
    },
  },
];

export const DataTable: FC = () => (
  <table className={styles.table}>
    <thead>
      <tr className={styles.headerRow}>
        <th className={styles.headerCell}>&nbsp;</th>
        <th className={styles.headerCell}>D AO Name</th>
        <th className={styles.headerCell}>DAOs activity</th>
        <th className={styles.headerCell}>Last 7 days</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row, index) => (
        <tr className={styles.row} key={row.id}>
          <td className={styles.cell}>{index + 1}</td>
          <td className={styles.cell} />
        </tr>
      ))}
    </tbody>
  </table>
);
