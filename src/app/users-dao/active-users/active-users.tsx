import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/app/shared';
import { isFailed, isSuccess } from 'src/utils';
import {
  clearUsersError,
  getUsersDaoActiveUsers,
} from 'src/app/shared/users/slice';
import {
  selectorUsersError,
  selectUsersDaoActiveUsersById,
} from 'src/app/shared/users/selectors';
import { UrlParams } from 'src/constants';
import { Interval } from 'src/api';

import styles from 'src/styles/page.module.scss';

export const ActiveUsers: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsersDaoActiveUsersById(dao));
  const error = useAppSelector(selectorUsersError);
  const getUsersDaoActiveUsersLoading = useAppSelector(
    selectActionLoading(getUsersDaoActiveUsers.typePrefix),
  );

  useMount(() => {
    if (!users) {
      dispatch(
        getUsersDaoActiveUsers({
          contract,
          dao,
          interval: Interval.WEEK,
        }),
      ).catch((err) => console.error(err));
    }
  });

  useUnmount(() => {
    dispatch(clearUsersError());
  });

  const usersData = useFilterMetrics(period, users);
  const periods = usePeriods(users?.metrics, ['1y', '6m', '3m', '1m']);

  return (
    <>
      <LoadingContainer
        hide={
          isSuccess(getUsersDaoActiveUsersLoading) ||
          isFailed(getUsersDaoActiveUsersLoading)
        }
      />
      {error ? <p className={styles.error}>{error}</p> : null}
      {usersData?.metrics?.length === 0 ? 'Not enough data' : null}
      <div className={styles.metricsContainer}>
        {usersData && usersData?.metrics?.length ? (
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
      </div>
    </>
  );
};
