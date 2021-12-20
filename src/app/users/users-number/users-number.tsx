import React, { FC, useCallback, useEffect, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useFilterMetrics, usePrepareLeaderboard } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending, isNotAsked } from 'src/utils';
import { getUsersUsers, getUsersLeaderboard } from 'src/app/shared/users/slice';
import {
  selectUsersUsers,
  selectUsersLeaderboard,
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

export const UsersNumber: FC = () => {
  const [period, setPeriod] = useState('1y');
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsersUsers);
  const usersLeaderboard = useAppSelector(selectUsersLeaderboard);
  const getUsersNumberLoading = useAppSelector(
    selectActionLoading(getUsersUsers.typePrefix),
  );
  const getUsersNumberLeaderboardLoading = useAppSelector(
    selectActionLoading(getUsersLeaderboard.typePrefix),
  );

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    if (
      isNotAsked(getUsersNumberLoading) &&
      !isPending(getUsersNumberLoading)
    ) {
      dispatch(
        getUsersUsers({
          contract,
        }),
      ).catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    }

    if (
      isNotAsked(getUsersNumberLeaderboardLoading) &&
      !isPending(getUsersNumberLeaderboardLoading)
    ) {
      dispatch(
        getUsersLeaderboard({
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
    getUsersNumberLoading,
    getUsersNumberLeaderboardLoading,
  ]);

  const usersLeaderboardData = usePrepareLeaderboard({
    leaderboard: usersLeaderboard?.metrics ? usersLeaderboard.metrics : null,
  });

  const usersData = useFilterMetrics(period, users);

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
            onRowClick={goToSingleDao}
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
