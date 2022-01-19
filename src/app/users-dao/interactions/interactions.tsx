import React, { FC, useState } from 'react';
import { useMount, useUnmount } from 'react-use';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isFailed } from 'src/utils';
import {
  clearUsersError,
  getUsersDaoInteractions,
} from 'src/app/shared/users/slice';
import {
  selectorUsersError,
  selectUsersDaoInteractionById,
} from 'src/app/shared/users/selectors';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const Interactions: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectorUsersError);
  const users = useAppSelector(selectUsersDaoInteractionById(dao));
  const getUsersInteractionsLoading = useAppSelector(
    selectActionLoading(getUsersDaoInteractions.typePrefix),
  );

  useMount(() => {
    if (!users) {
      dispatch(
        getUsersDaoInteractions({
          contract,
          dao,
        }),
      ).catch((err: unknown) => {
        console.error(err);
      });
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
        hide={
          isSuccess(getUsersInteractionsLoading) ||
          isFailed(getUsersInteractionsLoading)
        }
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
