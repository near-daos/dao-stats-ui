import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { isNotAsked, isSuccess } from 'src/utils';
import { isPending } from '@reduxjs/toolkit';
import { useFilterMetrics } from 'src/hooks';
import { getUsersInteractionsPerDaoHistory } from '../slice';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectActionLoading } from '../../../store/loading';
import { selectUsersInteractionsPerDaoHistory } from '../selectors';

import styles from '../users.module.scss';

export const NumberInteractionsPerDao: FC = () => {
  const [period, setPeriod] = useState('1y');

  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersInteractionsPerDaoHistory);
  const getUsersLoading = useAppSelector(
    selectActionLoading(getUsersInteractionsPerDaoHistory.typePrefix),
  );

  useEffect(() => {
    (async () => {
      if (
        (!users || isNotAsked(getUsersLoading)) &&
        !isPending(getUsersLoading)
      ) {
        dispatch(
          getUsersInteractionsPerDaoHistory({
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
