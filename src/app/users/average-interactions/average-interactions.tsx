import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { isNotAsked, isSuccess, isPending } from 'src/utils';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { getUsersAverageInteractions } from 'src/app/shared/users/slice';
import { selectUsersAverageInteractions } from 'src/app/shared/users/selectors';

import styles from 'src/styles/page.module.scss';

export const AverageInteractions: FC = () => {
  const [period, setPeriod] = useState('All');

  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
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
      ).catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    }
  }, [getUsersLoading, contract, dispatch]);

  const usersData = useFilterMetrics(period, users);
  const periods = usePeriods(users?.metrics);

  return (
    <>
      <LoadingContainer hide={isSuccess(getUsersLoading)} />

      <div className={styles.metricsContainer}>
        {usersData ? (
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
