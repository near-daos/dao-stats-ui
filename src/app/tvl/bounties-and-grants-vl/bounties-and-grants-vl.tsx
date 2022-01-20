import React, { FC, useCallback, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { useFilterMetrics, usePrepareLeaderboard, usePeriods } from 'src/hooks';
import { isFailed, isSuccess } from 'src/utils';
import { ROUTES, UrlParams } from 'src/constants';
import {
  getTvlBountiesAndGrantsVlLeaderboard,
  getTvlBountiesAndGrantsVl,
  selectTvlBountiesAndGrantsVl,
  selectTvlBountiesAndGrantsVlLeaderboard,
  clearTvlError,
  selectTvlError,
} from 'src/app/shared';

import styles from 'src/styles/page.module.scss';
import { useMount, useUnmount } from 'react-use';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const BountiesAndGrantsVl: FC = () => {
  const history = useHistory();
  const [period, setPeriod] = useState('All');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const error = useAppSelector(selectTvlError);
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const tvl = useAppSelector(selectTvlBountiesAndGrantsVl);
  const tvlLeaderboard = useAppSelector(
    selectTvlBountiesAndGrantsVlLeaderboard,
  );
  const getTvlLoading = useAppSelector(
    selectActionLoading(getTvlBountiesAndGrantsVl.typePrefix),
  );
  const getTvlLeaderboardLoading = useAppSelector(
    selectActionLoading(getTvlBountiesAndGrantsVlLeaderboard.typePrefix),
  );

  useMount(() => {
    if (!tvl) {
      dispatch(
        getTvlBountiesAndGrantsVl({
          contract,
        }),
      ).catch((err) => console.error(err));
    }

    if (!tvlLeaderboard) {
      dispatch(
        getTvlBountiesAndGrantsVlLeaderboard({
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
      history.push(generatePath(ROUTES.tvlDao, { contract, dao: row.dao }));
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
        {activeTab === 'history-data' && tvlData && tvlData?.metrics?.length ? (
          <ChartLine
            isCurrency
            periods={periods}
            data={tvlData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'VL in Bounties/Grants',
                color: '#E33F84',
                dataKey: 'count',
              },
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
              { value: 'VL in Bounties/Grants' },
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
