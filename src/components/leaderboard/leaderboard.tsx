import clsx from 'clsx';
import React from 'react';
import { ChartTiny } from '../charts/tiny-chart';
import { LeaderboarDataItem } from './leaderboardData';
import { SvgIcon } from '../svgIcon';

import styles from './leaderboard.module.scss';

interface LeaderboardItem {
  id: number;
  logo: string;
  label: string;
  domain: string;
  activity: number;
  percentChanges: number;
  negativeGrowth?: boolean;
  data: LeaderboarDataItem[];
}

type LeaderboardProps = {
  data: LeaderboardItem[];
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => (
  <table className={styles.tableWrapper}>
    <thead>
      <tr>
        <th> </th>
        <th className={styles.textStart}>DAO Name</th>
        <th className={styles.textStart}>DAOs activity</th>
        <th className={styles.textEnd}>Last 7 days</th>
      </tr>
    </thead>

    <tbody className={styles.leaderboardBody}>
      {data.map((el: LeaderboardItem, index: number) => (
        <tr key={el.id}>
          <td>{index + 1}</td>
          <td>
            <div className={styles.displayFlex}>
              <img className={styles.elementLogo} src={el.logo} alt="" />
              <span>
                <p>{el.label}</p>
                <p>{el.domain}</p>
              </span>
            </div>
          </td>
          <td>
            <div>
              <div className={styles.title}>
                {el.activity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
              <div
                className={clsx(styles.percentages, {
                  [styles.negativeGrowth]: el.negativeGrowth,
                })}
              >
                <SvgIcon icon="stats" className={styles.icon} />
                {el.percentChanges}%
              </div>
            </div>
          </td>
          <td>
            <ChartTiny negativeGrowth={el.negativeGrowth} data={el.data} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
