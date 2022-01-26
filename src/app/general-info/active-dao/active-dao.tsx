import React, { FC, useCallback, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/app/shared';
import { useFilterMetrics, usePrepareLeaderboard, usePeriods } from 'src/hooks';
import { isSuccess, isFailed } from 'src/utils';

import {
  selectGeneralActive,
  selectGeneralActiveLeaderboard,
  selectGeneralError,
} from 'src/app/shared/general/selectors';
import {
  clearGeneralError,
  getGeneralActive,
  getGeneralActiveLeaderboard,
} from 'src/app/shared/general/slice';

import styles from 'src/styles/page.module.scss';
import { ROUTES, UrlParams } from '../../../constants';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const ActiveDao: FC = () => {
  const history = useHistory();
  const [period, setPeriod] = useState('All');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const error = useAppSelector(selectGeneralError);
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const active = useAppSelector(selectGeneralActive);
  const activeLeaderboard = useAppSelector(selectGeneralActiveLeaderboard);
  const getGeneralActiveLoading = useAppSelector(
    selectActionLoading(getGeneralActive.typePrefix),
  );
  const getGeneralActiveLeaderboardLoading = useAppSelector(
    selectActionLoading(getGeneralActiveLeaderboard.typePrefix),
  );

  useMount(() => {
    if (!active) {
      dispatch(
        getGeneralActive({
          contract,
        }),
      ).catch((err: unknown) => console.error(err));
    }

    if (!activeLeaderboard) {
      dispatch(
        getGeneralActiveLeaderboard({
          contract,
        }),
      ).catch((err: unknown) => console.error(err));
    }
  });

  useUnmount(() => {
    dispatch(clearGeneralError());
  });

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  const activityLeaderboardData = usePrepareLeaderboard({
    leaderboard: activeLeaderboard?.metrics ? activeLeaderboard.metrics : null,
  });

  const activeData = useFilterMetrics(period, active);
  const periods = usePeriods(active?.metrics);

  const goToSingleDao = useCallback(
    (row) => {
      history.push(
        generatePath(ROUTES.generalInfoDao, { contract, dao: row.dao }),
      );
    },
    [contract, history],
  );

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          (isSuccess(getGeneralActiveLoading) &&
            isSuccess(getGeneralActiveLeaderboardLoading)) ||
          isFailed(getGeneralActiveLoading) ||
          isFailed(getGeneralActiveLeaderboardLoading)
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
      {activeTab === 'history-data' && activeData?.metrics?.length === 0
        ? 'Not enough data'
        : null}
      {error ? <p className={styles.error}>{error}</p> : null}
      <div className={styles.metricsContainer}>
        {activeTab === 'history-data' &&
        activeData &&
        activeData.metrics.length ? (
          <ChartLine
            periods={periods}
            data={activeData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Weekly Active DAOs',
                color: '#E33F84',
                dataKey: 'count',
              },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' && activityLeaderboardData ? (
          <Leaderboard
            onRowClick={goToSingleDao}
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'DAOs activity' },
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
