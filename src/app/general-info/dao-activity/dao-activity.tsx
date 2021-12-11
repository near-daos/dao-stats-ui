import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, Tabs, Leaderboard } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useFilterMetrics, usePrepareLeaderboard } from 'src/hooks';

import {
  selectGeneralActivity,
  selectGeneralActivityLeaderboard,
  selectLoading,
} from '../selectors';
import { getGeneralActivity, getGeneralActivityLeaderboard } from '../slice';

import styles from './dao-activity.module.scss';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const DaoActivity: FC = () => {
  const [period, setPeriod] = useState('1y');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);

  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const activity = useAppSelector(selectGeneralActivity);
  const activityLeaderboard = useAppSelector(selectGeneralActivityLeaderboard);
  const loading = useAppSelector(selectLoading);

  console.log('loading', loading);

  useEffect(() => {
    (async () => {
      try {
        if (!activity) {
          await dispatch(
            getGeneralActivity({
              contract,
            }),
          );
        }

        if (!activityLeaderboard) {
          console.log('start activityLeaderboard');
          await dispatch(
            getGeneralActivityLeaderboard({
              contract,
            }),
          );
        }
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  });

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  const activityLeaderboardData = usePrepareLeaderboard({
    leaderboard: activityLeaderboard?.metrics
      ? activityLeaderboard.metrics
      : null,
  });

  const activityData = useFilterMetrics(period, activity);

  return (
    <div className={styles.mainContent}>
      <div className={styles.tabWrapper}>
        <Tabs
          variant="small"
          options={tabOptions}
          className={styles.tabs}
          onChange={handleOnChange}
        />
      </div>
      <div className={styles.chart}>
        {activeTab === 'history-data' && activityData ? (
          <ChartLine
            data={activityData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              { name: 'DAOs activity', color: '#E33F84', dataKey: 'count' },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' && activityLeaderboardData ? (
          <Leaderboard
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'DAOs activity' },
              { value: 'Last 7 days', position: 'right' },
            ]}
            type="line"
            dataRows={activityLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
