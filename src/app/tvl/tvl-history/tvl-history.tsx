import React, { FC, useCallback, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useFilterMetrics, usePrepareLeaderboard, usePeriods } from 'src/hooks';
import { isFailed, isSuccess } from 'src/utils';

import styles from 'src/styles/page.module.scss';

import {
  selectActionLoading,
  getTvlHistory,
  getTvlLeaderboard,
  selectTvlTvl,
  selectTvlLeaderboard,
  clearTvlError,
  selectTvlError,
} from 'src/app/shared';
import { ROUTES, UrlParams } from 'src/constants';

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
  const history = useHistory();
  const error = useAppSelector(selectTvlError);
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const tvl = useAppSelector(selectTvlTvl);
  const tvlLeaderboard = useAppSelector(selectTvlLeaderboard);
  const getTvlLoading = useAppSelector(
    selectActionLoading(getTvlHistory.typePrefix),
  );
  const getTvlLeaderboardLoading = useAppSelector(
    selectActionLoading(getTvlLeaderboard.typePrefix),
  );

  useMount(() => {
    if (!tvl) {
      dispatch(
        getTvlHistory({
          contract,
        }),
      ).catch((err) => console.error(err));
    }

    if (!tvlLeaderboard) {
      dispatch(
        getTvlLeaderboard({
          contract,
        }),
      ).catch((err) => console.error(err));
    }
  });

  useUnmount(() => {
    dispatch(clearTvlError());
  });

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  const activityLeaderboardData = usePrepareLeaderboard({
    leaderboard: tvlLeaderboard?.metrics ? tvlLeaderboard.metrics : null,
  });

  const tvlData = useFilterMetrics(period, tvl);
  const periods = usePeriods(tvl?.metrics);

  const goToSingleDao = useCallback(
    (row) => {
      history.push(generatePath(ROUTES.tvlDaoTvl, { contract, dao: row.dao }));
    },
    [contract, history],
  );

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          (isSuccess(getTvlLoading) && isSuccess(getTvlLeaderboardLoading)) ||
          isFailed(getTvlLoading) ||
          isFailed(getTvlLeaderboardLoading)
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
      {error ? <p className={styles.error}>{error}</p> : null}
      {tvlData?.metrics?.length === 0 ? 'Not enough data' : null}
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
            onRowClick={goToSingleDao}
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
