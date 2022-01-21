import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isFailed } from 'src/utils';
import { clearUsersError, getUsersDaoUsers } from 'src/app/shared/users/slice';
import {
  selectUsersDaoUsersById,
  selectorUsersError,
} from 'src/app/shared/users/selectors';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const UsersNumber: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsersDaoUsersById(dao));
  const error = useAppSelector(selectorUsersError);
  const getUsersNumberLoading = useAppSelector(
    selectActionLoading(getUsersDaoUsers.typePrefix),
  );

  useMount(() => {
    if (!users) {
      dispatch(
        getUsersDaoUsers({
          contract,
          dao,
        }),
      ).catch((err) => console.error(err));
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
          isSuccess(getUsersNumberLoading) || isFailed(getUsersNumberLoading)
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
            lines={[{ name: 'Users', color: '#E33F84', dataKey: 'count' }]}
          />
        ) : null}
      </div>
    </>
  );
};
