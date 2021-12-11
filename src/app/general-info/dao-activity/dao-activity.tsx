import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import clsx from 'clsx';
import { ChartLine, Leaderboard, Loading, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { useFilterMetrics, usePrepareLeaderboard } from 'src/hooks';
import { RequestStatus } from '../../../store/types';

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
  const getGeneralActivityLoading = useAppSelector(
    selectActionLoading(getGeneralActivity.typePrefix),
  );

  const getGeneralActivityLeaderboardLoading = useAppSelector(
    selectActionLoading(getGeneralActivityLeaderboard.typePrefix),
  );

  useEffect(() => {
    if (
      (!activity || getGeneralActivityLoading === RequestStatus.NOT_ASKED) &&
      getGeneralActivityLoading !== RequestStatus.PENDING
    ) {
      dispatch(
        getGeneralActivity({
          contract,
        }),
      ).catch((error) => console.log(error));
    }

    if (
      (!activityLeaderboard ||
        getGeneralActivityLeaderboardLoading === RequestStatus.NOT_ASKED) &&
      getGeneralActivityLeaderboardLoading !== RequestStatus.PENDING
    ) {
      dispatch(
        getGeneralActivityLeaderboard({
          contract,
        }),
      ).catch((error) => console.log(error));
    }
  }, [
    dispatch,
    contract,
    activity,
    getGeneralActivityLoading,
    activityLeaderboard,
    getGeneralActivityLeaderboardLoading,
  ]);

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
      <div
        className={clsx(styles.loading, {
          [styles.showLoading]:
            getGeneralActivityLoading === RequestStatus.PENDING ||
            getGeneralActivityLeaderboardLoading === RequestStatus.PENDING,
        })}
      >
        <Loading />
      </div>

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
              { name: 'Active DAOs', color: '#E33F84', dataKey: 'count' },
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
