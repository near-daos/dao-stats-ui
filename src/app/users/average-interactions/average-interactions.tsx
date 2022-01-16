import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useUnmount } from 'react-use';

import { ChartLine, LoadingContainer } from 'src/components';
import { isNotAsked, isSuccess, isPending, isFailed } from 'src/utils';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import {
  clearUsersError,
  getUsersAverageInteractions,
} from 'src/app/shared/users/slice';
import {
  selectorUsersError,
  selectUsersAverageInteractions,
} from 'src/app/shared/users/selectors';
import { Params } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const AverageInteractions: FC = () => {
  const [period, setPeriod] = useState('All');

  const { contract } = useParams<Params>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectorUsersError);
  const users = useAppSelector(selectUsersAverageInteractions);
  const getUsersLoading = useAppSelector(
    selectActionLoading(getUsersAverageInteractions.typePrefix),
  );

  useEffect(() => {
    if (isNotAsked(getUsersLoading) && !isPending(getUsersLoading)) {
      dispatch(
        getUsersAverageInteractions({
          contract,
        }),
      ).catch((err: unknown) => {
        console.error(err);
      });
    }
  }, [getUsersLoading, contract, dispatch]);

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
