import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { isNotAsked, isSuccess } from 'src/utils';
import { isPending } from '@reduxjs/toolkit';
import { useFilterMetrics } from 'src/hooks';
import { getUsersAveragePerDaoHistory } from '../slice';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectActionLoading } from '../../../store/loading';
import { selectUsersAveragePerDaoHistory } from '../selectors';

import styles from '../users.module.scss';

export const NumberUsersPerDao: FC = () => {
  const [period, setPeriod] = useState('1y');

  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersAveragePerDaoHistory);
  const getUsersLoading = useAppSelector(
    selectActionLoading(getUsersAveragePerDaoHistory.typePrefix),
  );

  useEffect(() => {
    (async () => {
      if (
        (!users || isNotAsked(getUsersLoading)) &&
        !isPending(getUsersLoading)
      ) {
        dispatch(
          getUsersAveragePerDaoHistory({
            contract,
          }),
        );
      }
    })();
  }, [users, getUsersLoading, contract, dispatch]);

  const daosData = useFilterMetrics(period, users);

  return (
    <>
      <LoadingContainer hide={isSuccess(getUsersLoading)} />

      <div className={styles.metricsContainer}>
        {daosData ? (
          <ChartLine
            data={daosData}
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
