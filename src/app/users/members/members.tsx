import React, { FC, useCallback, useEffect, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router';
import { useUnmount } from 'react-use';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useFilterMetrics, usePeriods, usePrepareLeaderboard } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending, isNotAsked, isFailed } from 'src/utils';
import {
  clearUsersError,
  getUsersMembers,
  getUsersMembersLeaderboard,
} from 'src/app/shared/users/slice';
import {
  selectorUsersError,
  selectUsersMembers,
  selectUsersMembersLeaderboard,
} from 'src/app/shared/users/selectors';

import styles from 'src/styles/page.module.scss';
import { ROUTES } from '../../../constants';
import { getDao } from '../../shared';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const Members: FC = () => {
  const [period, setPeriod] = useState('All');
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectorUsersError);
  const users = useAppSelector(selectUsersMembers);
  const usersLeaderboard = useAppSelector(selectUsersMembersLeaderboard);
  const getUsersNumberLoading = useAppSelector(
    selectActionLoading(getUsersMembers.typePrefix),
  );
  const getUsersNumberLeaderboardLoading = useAppSelector(
    selectActionLoading(getUsersMembersLeaderboard.typePrefix),
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
        getUsersMembers({
          contract,
        }),
      ).catch((err: unknown) => {
        console.error(err);
      });
    }

    if (
      isNotAsked(getUsersNumberLeaderboardLoading) &&
      !isPending(getUsersNumberLeaderboardLoading)
    ) {
      dispatch(
        getUsersMembersLeaderboard({
          contract,
        }),
      ).catch((err: unknown) => {
        console.error(err);
      });
    }
  }, [
    contract,
    dispatch,
    getUsersNumberLoading,
    getUsersNumberLeaderboardLoading,
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
      dispatch(getDao({ contract, dao: row.dao }))
        .then(() => {
          history.push(
            generatePath(ROUTES.usersMembersDao, { contract, dao: row.dao }),
          );
        })
        .catch((err: unknown) => {
          console.error(err);
        });
    },
    [contract, history, dispatch],
  );

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          (isSuccess(getUsersNumberLoading) &&
            isSuccess(getUsersNumberLeaderboardLoading)) ||
          isFailed(getUsersNumberLoading) ||
          isFailed(getUsersNumberLeaderboardLoading)
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
            lines={[{ name: 'Members', color: '#E33F84', dataKey: 'count' }]}
          />
        ) : null}
        {activeTab === 'leaderboard' && usersLeaderboardData ? (
          <Leaderboard
            onRowClick={goToSingleDao}
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Members' },
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
