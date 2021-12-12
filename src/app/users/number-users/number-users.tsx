import React, { FC, useEffect, useState } from 'react';
import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useParams } from 'react-router';
import { useFilterMetrics, usePrepareLeaderboard } from 'src/hooks';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectActionLoading } from '../../../store/loading';
import { isSuccess, isPending, isNotAsked } from '../../../utils';
import { getUsersHistory, getUsersLeaderboard } from '../slice';
import { selectUsersHistory, selectUsersLeaderboard } from '../selectors';

import styles from '../users.module.scss';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const NumberUsers: FC = () => {
  const [period, setPeriod] = useState('1y');

  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsersHistory);
  const usersLeaderboard = useAppSelector(selectUsersLeaderboard);
  const getUsersNumberLoading = useAppSelector(
    selectActionLoading(getUsersHistory.typePrefix),
  );
  const getUsersNumberLeaderboardLoading = useAppSelector(
    selectActionLoading(getUsersLeaderboard.typePrefix),
  );

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    (async () => {
      try {
        if (
          (!users || isNotAsked(getUsersNumberLoading)) &&
          !isPending(getUsersNumberLoading)
        ) {
          await dispatch(
            getUsersHistory({
              contract,
            }),
          );
        }

        if (
          (!usersLeaderboard || isNotAsked(getUsersNumberLeaderboardLoading)) &&
          !isPending(getUsersNumberLeaderboardLoading)
        ) {
          await dispatch(
            getUsersLeaderboard({
              contract,
            }),
          );
        }
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, [
    users,
    usersLeaderboard,
    period,
    contract,
    dispatch,
    getUsersNumberLoading,
    getUsersNumberLeaderboardLoading,
  ]);

  const usersLeaderboardData = usePrepareLeaderboard({
    leaderboard: usersLeaderboard?.metrics ? usersLeaderboard.metrics : null,
  });

  const usersData = useFilterMetrics(period, users);

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          isSuccess(getUsersNumberLoading) &&
          isSuccess(getUsersNumberLeaderboardLoading)
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
            data={usersData}
            period={period}
            setPeriod={setPeriod}
            lines={[{ name: 'Users', color: '#E33F84', dataKey: 'count' }]}
          />
        ) : null}
        {activeTab === 'leaderboard' && usersLeaderboardData ? (
          <Leaderboard
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Users' },
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
