import React, { FC, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';

import { ChartLine, Tabs, Leaderboard } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getDateFromMow } from 'src/components/charts/helpers';
import { usePrepareLeaderboard } from 'src/hooks';

import {
  selectGeneralActivity,
  selectGeneralActivityLeaderboard,
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

  useEffect(() => {
    (async () => {
      try {
        await dispatch(
          getGeneralActivity({
            contract,
            from: String(getDateFromMow(period)),
          }),
        );
        await dispatch(
          getGeneralActivityLeaderboard({
            contract,
          }),
        );
      } catch (error: unknown) {
        console.error(error);
      }
    })();
  }, [period, contract, dispatch]);

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  const activityLeaderboardData = usePrepareLeaderboard({
    leaderboard: activityLeaderboard,
  });

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
        {activeTab === 'history-data' && activity ? (
          <ChartLine
            data={activity}
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
