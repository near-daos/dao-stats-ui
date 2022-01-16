import React, { FC, useCallback, useEffect, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useFilterMetrics, usePeriods, usePrepareLeaderboard } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending, isNotAsked, isFailed } from 'src/utils';
import {
  clearUsersError,
  getUsersInteractions,
  getUsersInteractionsLeaderboard,
} from 'src/app/shared/users/slice';
import {
  selectorUsersError,
  selectUsersInteractions,
  selectUsersInteractionsLeaderboard,
} from 'src/app/shared/users/selectors';
import { Params, ROUTES } from 'src/constants';

import styles from 'src/styles/page.module.scss';
import { useUnmount } from 'react-use';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const Interactions: FC = () => {
  const [period, setPeriod] = useState('All');
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const { contract } = useParams<Params>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectorUsersError);
  const users = useAppSelector(selectUsersInteractions);
  const usersLeaderboard = useAppSelector(selectUsersInteractionsLeaderboard);
  const getUsersInteractionsLoading = useAppSelector(
    selectActionLoading(getUsersInteractions.typePrefix),
  );
  const getUsersInteractionsLeaderboardLoading = useAppSelector(
    selectActionLoading(getUsersInteractionsLeaderboard.typePrefix),
  );

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    if (
      isNotAsked(getUsersInteractionsLoading) &&
      !isPending(getUsersInteractionsLoading)
    ) {
      dispatch(
        getUsersInteractions({
          contract,
        }),
      ).catch((err: unknown) => {
        console.error(err);
      });
    }

    if (
      isNotAsked(getUsersInteractionsLeaderboardLoading) &&
      !isPending(getUsersInteractionsLeaderboardLoading)
    ) {
      dispatch(
        getUsersInteractionsLeaderboard({
          contract,
        }),
      ).catch((err: unknown) => {
        console.error(err);
      });
    }
  }, [
    contract,
    dispatch,
    getUsersInteractionsLoading,
    getUsersInteractionsLeaderboardLoading,
  ]);

  useUnmount(() => {
    dispatch(clearUsersError());
  });

  const usersLeaderboardData = usePrepareLeaderboard({
    leaderboard: usersLeaderboard?.metrics ? usersLeaderboard.metrics : null,
  });

  const usersData = useFilterMetrics(period, users);
  const periods = usePeriods(users?.metrics);

  const goToSingleDao = useCallback(
    (row) => {
      history.push(
        generatePath(ROUTES.usersInteractionsDao, {
          contract,
          dao: row.dao,
        }),
      );
    },
    [contract, history],
  );

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          (isSuccess(getUsersInteractionsLoading) &&
            isSuccess(getUsersInteractionsLeaderboardLoading)) ||
          isFailed(getUsersInteractionsLoading) ||
          isFailed(getUsersInteractionsLeaderboardLoading)
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
      {activeTab === 'history-data' && usersData?.metrics?.length === 0
        ? 'Not enough data'
        : null}
      {activeTab === 'leaderboard' && usersLeaderboardData.length === 0
        ? 'Not enough data'
        : null}
      {error ? <p className={styles.error}>{error}</p> : null}
      <div className={styles.metricsContainer}>
        {activeTab === 'history-data' &&
        usersData &&
        usersData?.metrics?.length ? (
          <ChartLine
            periods={periods}
            data={usersData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Number of interactions',
                color: '#E33F84',
                dataKey: 'count',
              },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' && usersLeaderboardData ? (
          <Leaderboard
            onRowClick={goToSingleDao}
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Number of interactions' },
              { value: 'Last 7 days', position: 'right' },
            ]}
            type="line"
            dataRows={usersLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
