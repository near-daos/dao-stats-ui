import React, { FC, useCallback, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router';
import { useUnmount, useMount } from 'react-use';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useFilterMetrics, usePeriods, usePrepareLeaderboard } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isFailed } from 'src/utils';
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
import { ROUTES, UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

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
  const { contract } = useParams<UrlParams>();
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

  useMount(() => {
    if (!users) {
      dispatch(
        getUsersInteractions({
          contract,
        }),
      ).catch((err: unknown) => console.error(err));
    }

    if (!usersLeaderboard) {
      dispatch(
        getUsersInteractionsLeaderboard({
          contract,
        }),
      ).catch((err: unknown) => console.error(err));
    }
  });

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
                name: 'Number of Interactions',
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
              { value: 'Number of Interactions' },
              { value: 'Last Month', position: 'right' },
            ]}
            type="line"
            dataRows={usersLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
