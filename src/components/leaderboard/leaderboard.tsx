import React, { FC, HTMLProps } from 'react';
import clsx from 'clsx';

import { MetricItem, Proposals, TotalMetrics } from 'src/api';

import { StackedChart, ChartTiny } from '../charts';
import { Amount } from './amount';
import { TitleCell, TitleCellProps } from './title-cell';

import styles from './leaderboard.module.scss';

type LeaderboardHeaderCellProps = {
  value?: string;
  position?: 'left' | 'right';
};

export type LeaderboardDataItem = {
  id: number;
  titleCell: TitleCellProps;
  line?: {
    totalMetrics?: TotalMetrics;
    metrics?: MetricItem[];
  };
  doubleLine?: {
    number: {
      totalMetrics: TotalMetrics;
      metrics: MetricItem[];
    };
    vl: {
      totalMetrics: TotalMetrics;
      metrics: MetricItem[];
    };
  };
  proposals?: Proposals;
};

interface LeaderboardProps extends HTMLProps<HTMLTableElement> {
  headerCells: LeaderboardHeaderCellProps[];
  className?: string;
  tableClassName?: string;
  dataRows: LeaderboardDataItem[];
  tableBodyClassName?: string;
  type: 'line' | 'doubleLine' | 'stacked';
}

export const Leaderboard: FC<LeaderboardProps> = ({
  className,
  tableClassName,
  tableBodyClassName,
  headerCells,
  dataRows,
  type = 'line',
}) => (
  <div className={clsx(styles.tableWrapper, className)}>
    <table
      className={clsx(styles.table, tableClassName)}
      cellPadding={0}
      cellSpacing={0}
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
        {dataRows.map((row, index) => (
          <tr key={row.id} className={styles.row}>
            <td className={styles.cell}>{index + 1}</td>
            <td className={styles.cell}>
              <TitleCell {...row.titleCell} />
            </td>
            {type === 'line' && (
              <>
                <td className={styles.cell}>
                  <Amount
                    count={row?.line?.totalMetrics?.count || 0}
                    growth={row?.line?.totalMetrics?.growth || 0}
                  />
                </td>
                <td className={styles.cell}>
                  <ChartTiny rightAlign data={row?.line?.metrics || []} />
                </td>
              </>
            )}
            {type === 'doubleLine' && (
              <>
                <td className={styles.cell}>
                  <div className={styles.cellWrapper}>
                    <Amount
                      count={row?.doubleLine?.number?.totalMetrics.count || 0}
                      growth={row?.doubleLine?.number?.totalMetrics.growth || 0}
                    />
                    <ChartTiny
                      width={96}
                      data={row?.doubleLine?.number?.metrics || []}
                    />
                  </div>
                </td>
                <td className={styles.cell}>
                  <div className={styles.cellWrapper}>
                    <Amount
                      count={row?.doubleLine?.vl?.totalMetrics.count || 0}
                      growth={row?.doubleLine?.vl?.totalMetrics.growth || 0}
                    />
                    <ChartTiny
                      width={96}
                      data={row?.doubleLine?.vl.metrics || []}
                    />
                  </div>
                </td>
              </>
            )}
            {type === 'stacked' && (
              <>
                <td className={styles.cell}>
                  <StackedChart proposals={row?.proposals} />
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
