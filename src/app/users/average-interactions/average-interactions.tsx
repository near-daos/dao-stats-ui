import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useUnmount, useMount } from 'react-use';

import { ChartLine, LoadingContainer } from 'src/components';
import { isSuccess, isFailed } from 'src/utils';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/app/shared';
import {
  clearUsersError,
  getUsersAverageInteractions,
} from 'src/app/shared/users/slice';
import {
  selectorUsersError,
  selectUsersAverageInteractions,
} from 'src/app/shared/users/selectors';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const AverageInteractions: FC = () => {
  const [period, setPeriod] = useState('All');

  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectorUsersError);
  const users = useAppSelector(selectUsersAverageInteractions);
  const getUsersLoading = useAppSelector(
    selectActionLoading(getUsersAverageInteractions.typePrefix),
  );

  useMount(() => {
    if (!users) {
      dispatch(
        getUsersAverageInteractions({
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
                name: 'Number of Interactions per DAO',
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
