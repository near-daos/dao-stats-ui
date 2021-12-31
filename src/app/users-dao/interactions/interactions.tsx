import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending } from 'src/utils';
import { getUsersDaoInteractions } from 'src/app/shared/users/slice';
import { selectUsersDaoInteractionById } from 'src/app/shared/users/selectors';

import styles from 'src/styles/page.module.scss';

export const Interactions: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsersDaoInteractionById(dao));
  const getUsersInteractionsLoading = useAppSelector(
    selectActionLoading(getUsersDaoInteractions.typePrefix),
  );

  useEffect(() => {
    if (!users && !isPending(getUsersInteractionsLoading)) {
      dispatch(
        getUsersDaoInteractions({
          contract,
          dao,
        }),
      ).catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    }
  }, [users, dao, contract, dispatch, getUsersInteractionsLoading]);

  const usersData = useFilterMetrics(period, users);
  const periods = usePeriods(users?.metrics);

  return (
    <>
      <LoadingContainer hide={isSuccess(getUsersInteractionsLoading)} />

      <div className={styles.metricsContainer}>
        {usersData ? (
          <ChartLine
            periods={periods}
            data={usersData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Number of interactions',
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
