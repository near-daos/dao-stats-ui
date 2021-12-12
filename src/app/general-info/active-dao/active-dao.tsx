import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { useFilterMetrics, usePrepareLeaderboard } from 'src/hooks';
import { isPending, isSuccess, isNotAsked } from 'src/utils';

import {
  selectGeneralActive,
  selectGeneralActiveLeaderboard,
} from '../selectors';
import { getGeneralActive, getGeneralActiveLeaderboard } from '../slice';

import styles from '../general-info.module.scss';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const ActiveDao: FC = () => {
  const [period, setPeriod] = useState('1y');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);

  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const active = useAppSelector(selectGeneralActive);
  const activeLeaderboard = useAppSelector(selectGeneralActiveLeaderboard);
  const getGeneralActiveLoading = useAppSelector(
    selectActionLoading(getGeneralActive.typePrefix),
  );
  const getGeneralActiveLeaderboardLoading = useAppSelector(
    selectActionLoading(getGeneralActiveLeaderboard.typePrefix),
  );

  useEffect(() => {
    if (
      (!active || isNotAsked(getGeneralActiveLoading)) &&
      !isPending(getGeneralActiveLoading)
    ) {
      dispatch(
        getGeneralActive({
          contract,
        }),
        // eslint-disable-next-line no-console
      ).catch((error: unknown) => console.error(error));
    }

    if (
      (!activeLeaderboard || isNotAsked(getGeneralActiveLeaderboardLoading)) &&
      !isPending(getGeneralActiveLeaderboardLoading)
    ) {
      dispatch(
        getGeneralActiveLeaderboard({
          contract,
        }),
        // eslint-disable-next-line no-console
      ).catch((error: unknown) => console.error(error));
    }
  }, [
    dispatch,
    contract,
    active,
    getGeneralActiveLoading,
    activeLeaderboard,
    getGeneralActiveLeaderboardLoading,
  ]);

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  const activityLeaderboardData = usePrepareLeaderboard({
    leaderboard: activeLeaderboard?.metrics ? activeLeaderboard.metrics : null,
  });

  const activeData = useFilterMetrics(period, active);

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          isSuccess(getGeneralActiveLoading) &&
          isSuccess(getGeneralActiveLeaderboardLoading)
        }
      />
      <div className={styles.tabWrapper}>
        <Tabs
          variant="small"
          options={tabOptions}
          className={styles.tabs}
          onChange={handleOnChange}
        />
      </div>
      <div className={styles.metricsContainer}>
        {activeTab === 'history-data' && activeData ? (
          <ChartLine
            data={activeData}
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
