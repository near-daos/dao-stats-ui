import React, { FC, useCallback, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useFilterMetrics, usePeriods, usePrepareLeaderboard } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/app/shared';
import { isFailed, isSuccess } from 'src/utils';
import {
  clearUsersError,
  getUsersActiveUsers,
  getUsersActiveUsersLeaderboard,
} from 'src/app/shared/users/slice';
import {
  selectorUsersError,
  selectUsersActiveUsers,
  selectUsersActiveUsersLeaderboard,
} from 'src/app/shared/users/selectors';

import styles from 'src/styles/page.module.scss';
import { ROUTES, UrlParams } from '../../../constants';
import { Interval } from '../../../api';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const ActiveUsers: FC = () => {
  const [period, setPeriod] = useState('All');
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectorUsersError);

  const users = useAppSelector(selectUsersActiveUsers);
  const usersLeaderboard = useAppSelector(selectUsersActiveUsersLeaderboard);
  const getUsersActiveUsersLoading = useAppSelector(
    selectActionLoading(getUsersActiveUsers.typePrefix),
  );
  const getUsersActiveUsersLeaderboardLoading = useAppSelector(
    selectActionLoading(getUsersActiveUsersLeaderboard.typePrefix),
  );

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  useMount(() => {
    if (!users) {
      dispatch(
        getUsersActiveUsers({
          contract,
          interval: Interval.WEEK,
        }),
      ).catch((err: unknown) => console.error(err));
    }

    if (!usersLeaderboard) {
      dispatch(
        getUsersActiveUsersLeaderboard({
          contract,
          interval: Interval.WEEK,
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
  const periods = usePeriods(users?.metrics, ['1y', '6m', '3m', '1m', 'All']);

  const goToSingleDao = useCallback(
    (row) => {
      history.push(generatePath(ROUTES.usersDao, { contract, dao: row.dao }));
    },
    [contract, history],
  );

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          (isSuccess(getUsersActiveUsersLoading) &&
            isSuccess(getUsersActiveUsersLeaderboardLoading)) ||
          isFailed(getUsersActiveUsersLoading) ||
          isFailed(getUsersActiveUsersLeaderboardLoading)
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
        {activeTab === 'history-data' && usersData ? (
          <ChartLine
            periods={periods}
            data={usersData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              { name: 'Active Users', color: '#E33F84', dataKey: 'count' },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' && usersLeaderboardData ? (
          <Leaderboard
            onRowClick={goToSingleDao}
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Active Users' },
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
