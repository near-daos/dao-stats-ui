import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { isNotAsked, isSuccess, isPending } from 'src/utils';
import { useFilterMetrics } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { getUsersAveragePerDaoHistory } from 'src/app/shared/users/slice';
import { selectUsersAveragePerDaoHistory } from 'src/app/shared/users/selectors';

import styles from 'src/styles/page.module.scss';

export const NumberUsersPerDao: FC = () => {
  const [period, setPeriod] = useState('1y');

  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersAveragePerDaoHistory);
  const getUsersLoading = useAppSelector(
    selectActionLoading(getUsersAveragePerDaoHistory.typePrefix),
  );

  useEffect(() => {
    if (isNotAsked(getUsersLoading) && !isPending(getUsersLoading)) {
      dispatch(
        getUsersAveragePerDaoHistory({
          contract,
        }),
      ).catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    }
  }, [getUsersLoading, contract, dispatch]);

  const usersData = useFilterMetrics(period, users);

  return (
    <>
      <LoadingContainer hide={isSuccess(getUsersLoading)} />

      <div className={styles.metricsContainer}>
        {usersData ? (
          <ChartLine
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
