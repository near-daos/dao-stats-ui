import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { useFilterMetrics, usePrepareLeaderboard, usePeriods } from 'src/hooks';
import { isPending, isSuccess, isNotAsked } from 'src/utils';

import styles from 'src/styles/page.module.scss';

import {
  getTvlHistory,
  getTvlLeaderboard,
  selectTvlTvl,
  selectTvlLeaderboard,
} from 'src/app/shared';
import { Params } from '../../../api';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const TvlHistory: FC = () => {
  const [period, setPeriod] = useState('All');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);

  const { contract } = useParams<Params>();
  const dispatch = useAppDispatch();
  const tvl = useAppSelector(selectTvlTvl);
  const tvlLeaderboard = useAppSelector(selectTvlLeaderboard);
  const getTvlLoading = useAppSelector(
    selectActionLoading(getTvlHistory.typePrefix),
  );
  const getTvlLeaderboardLoading = useAppSelector(
    selectActionLoading(getTvlLeaderboard.typePrefix),
  );

  useEffect(() => {
    if (isNotAsked(getTvlLoading) && !isPending(getTvlLoading)) {
      dispatch(
        getTvlHistory({
          contract,
        }),
      ).catch((error: unknown) => console.error(error));
    }

    if (
      isNotAsked(getTvlLeaderboardLoading) &&
      !isPending(getTvlLeaderboardLoading)
    ) {
      dispatch(
        getTvlLeaderboard({
          contract,
        }),
      ).catch((error: unknown) => console.error(error));
    }
  }, [dispatch, contract, getTvlLoading, getTvlLeaderboardLoading]);

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  const activityLeaderboardData = usePrepareLeaderboard({
    leaderboard: tvlLeaderboard?.metrics ? tvlLeaderboard.metrics : null,
  });

  const tvlData = useFilterMetrics(period, tvl);
  const periods = usePeriods(tvl?.metrics);

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={isSuccess(getTvlLoading) && isSuccess(getTvlLeaderboardLoading)}
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
        {activeTab === 'history-data' && tvlData ? (
          <ChartLine
            isCurrency
            periods={periods}
            data={tvlData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              { name: 'Platform TVL', color: '#E33F84', dataKey: 'count' },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' && activityLeaderboardData ? (
          <Leaderboard
            isCurrency
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Platform TVL' },
              { value: 'Last Month', position: 'right' },
            ]}
            type="line"
            dataRows={activityLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
