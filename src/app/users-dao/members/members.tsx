import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, LoadingContainer } from 'src/components';
import { UrlParams } from 'src/constants';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isFailed } from 'src/utils';
import {
  clearUsersError,
  getUsersDaoMembers,
} from 'src/app/shared/users/slice';
import {
  selectorUsersError,
  selectUsersDaoMembersById,
} from 'src/app/shared/users/selectors';

import styles from 'src/styles/page.module.scss';

export const Members: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();

  const error = useAppSelector(selectorUsersError);
  const users = useAppSelector(selectUsersDaoMembersById(dao));
  const getUsersNumberLoading = useAppSelector(
    selectActionLoading(getUsersDaoMembers.typePrefix),
  );

  useMount(() => {
    if (!users) {
      dispatch(
        getUsersDaoMembers({
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
            lines={[{ name: 'Members', color: '#E33F84', dataKey: 'count' }]}
          />
        ) : null}
      </div>
    </>
  );
};
