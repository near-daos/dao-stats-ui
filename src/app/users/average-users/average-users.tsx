import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useUnmount, useMount } from 'react-use';

import { ChartLine, LoadingContainer } from 'src/components';
import { isNotAsked, isSuccess, isPending, isFailed } from 'src/utils';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/app/shared';
import {
  clearUsersError,
  getUsersAverageUsers,
} from 'src/app/shared/users/slice';
import {
  selectorUsersError,
  selectUsersAverageUsers,
} from 'src/app/shared/users/selectors';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const AverageUsers: FC = () => {
  const dispatch = useAppDispatch();
  const { contract } = useParams<UrlParams>();
  const [period, setPeriod] = useState('All');
  const error = useAppSelector(selectorUsersError);
  const users = useAppSelector(selectUsersAverageUsers);
  const getUsersLoading = useAppSelector(
    selectActionLoading(getUsersAverageUsers.typePrefix),
  );

  useMount(() => {
    if (isNotAsked(getUsersLoading) && !isPending(getUsersLoading)) {
      dispatch(
        getUsersAverageUsers({
          contract,
        }),
      ).catch((err: unknown) => console.error(err));
    }
  });

  useUnmount(() => {
    dispatch(clearUsersError());
  });

  const usersData = useFilterMetrics(period, users);
  const periods = usePeriods(users?.metrics);

  return (
    <>
      <LoadingContainer
        hide={isSuccess(getUsersLoading) || isFailed(getUsersLoading)}
      />
      {usersData?.metrics?.length === 0 ? 'Not enough data' : null}
      {error ? <p className={styles.error}>{error}</p> : null}
      <div className={styles.metricsContainer}>
        {usersData && usersData?.metrics?.length ? (
          <ChartLine
            periods={periods}
            data={usersData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Average Users per DAO',
                color: '#E33F84',
                dataKey: 'count',
              },
            ]}
          />
        ) : null}
      </div>
    </>
  );
};
