import React, { FC } from 'react';

import { WidgetTile, WidgetInfo, Tabs, Leaderboard } from '../../components';

import { ChartLine } from '../../components/charts/line-chart';
import { getRechartsData } from '../../components/charts/rechartsData';
import { leaderboardData } from '../../components/leaderboard/leaderboardData';

import styles from './general-info.module.scss';

const rechartsData = getRechartsData();

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const GeneralInfo: FC = () => (
  <div className={styles.subpageWrapper}>
    <h1 className={styles.title}>General Info</h1>
    <div className={styles.subpageContent}>
      <div className={styles.widgets}>
        <div>
          <WidgetTile>
            <WidgetInfo
              title="Vote through rate"
              number="456"
              percentages={10}
            />
          </WidgetTile>
        </div>

        <div>
          <WidgetTile active>
            <WidgetInfo
              title="Vote through rate"
              number="456"
              percentages={10}
            />
          </WidgetTile>
        </div>

        <div>
          <WidgetTile>
            <WidgetInfo
              title="Vote through rate"
              number="456"
              percentages={10}
            />
          </WidgetTile>
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.tabWrapper}>
          <Tabs variant="small" options={tabOptions} className={styles.tabs} />
        </div>
        <div className={styles.chartWrapper}>
          <ChartLine data={rechartsData} />
        </div>
        <div className={styles.leaderboardWrapper}>
          <Leaderboard data={leaderboardData} />
        </div>
      </div>
    </div>
  </div>
);
