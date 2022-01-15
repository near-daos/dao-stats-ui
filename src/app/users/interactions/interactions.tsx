import React, { FC, useCallback, useEffect, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useFilterMetrics, usePeriods, usePrepareLeaderboard } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending, isNotAsked } from 'src/utils';
import {
  getUsersInteractions,
  getUsersInteractionsLeaderboard,
} from 'src/app/shared/users/slice';
import {
  selectUsersInteractions,
  selectUsersInteractionsLeaderboard,
} from 'src/app/shared/users/selectors';

import styles from 'src/styles/page.module.scss';
import { ROUTES } from '../../../constants';

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
  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();

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
      ).catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(error);
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
      ).catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    }
  }, [
    contract,
    dispatch,
    getUsersInteractionsLoading,
    getUsersInteractionsLeaderboardLoading,
  ]);

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
          isSuccess(getUsersInteractionsLoading) &&
          isSuccess(getUsersInteractionsLeaderboardLoading)
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
        {activeTab === 'history-data' && usersData ? (
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
