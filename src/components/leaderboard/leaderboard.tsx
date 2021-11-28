import React, { FC, HTMLProps } from 'react';
import clsx from 'clsx';

import {
  StackedChart,
  StackedChartItem,
  LineChartItem,
  ChartTiny,
} from '../charts';
import { Amount, AmountProps } from './amount';
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
    amount: AmountProps;
    chartData: LineChartItem[];
  };
  doubleLine?: {
    number: {
      amount: AmountProps;
      chartData: LineChartItem[];
    };
    vl: {
      amount: AmountProps;
      chartData: LineChartItem[];
    };
  };
  stacked?: StackedChartItem[];
};

interface LeaderboardProps extends HTMLProps<HTMLTableElement> {
  headerCells: LeaderboardHeaderCellProps[];
  className?: string;
  dataRows: LeaderboardDataItem[];
  tableBodyClassName?: string;
  type: 'line' | 'doubleLine' | 'stacked';
}

export const Leaderboard: FC<LeaderboardProps> = ({
  className,
  tableBodyClassName,
  headerCells,
  dataRows,
  type = 'line',
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
      {dataRows.map((row, index) => (
        <tr key={row.id} className={styles.row}>
          <td className={styles.cell}>{index + 1}</td>
          <td className={styles.cell}>
            <TitleCell {...row.titleCell} />
          </td>
          {type === 'line' && (
            <>
              <td className={styles.cell}>
                <Amount {...row?.line?.amount} />
              </td>
              <td className={styles.cell}>
                <ChartTiny
                  rightAlign
                  data={row?.line?.chartData || []}
                  negativeGrowth={row?.line?.amount.isNegativeGrowth}
                />
              </td>
            </>
          )}
          {type === 'doubleLine' && (
            <>
              <td className={styles.cell}>
                <div className={styles.cellWrapper}>
                  <Amount {...row?.doubleLine?.number.amount} />
                  <ChartTiny
                    width={96}
                    data={row?.doubleLine?.number?.chartData || []}
                    negativeGrowth={
                      row?.doubleLine?.number?.amount?.isNegativeGrowth
                    }
                  />
                </div>
              </td>
              <td className={styles.cell}>
                <div className={styles.cellWrapper}>
                  <Amount {...row?.doubleLine?.vl?.amount} />
                  <ChartTiny
                    width={96}
                    data={row?.doubleLine?.vl.chartData || []}
                    negativeGrowth={row?.doubleLine?.vl.amount.isNegativeGrowth}
                  />
                </div>
              </td>
            </>
          )}
          {type === 'stacked' && (
            <>
              <td className={styles.cell}>
                <StackedChart data={row?.stacked || []} />
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  </table>
);
