import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending } from 'src/utils';
import { getUsersDaoUsers } from 'src/app/shared/users/slice';
import { selectUsersDaoUsersById } from 'src/app/shared/users/selectors';

import styles from 'src/styles/page.module.scss';

export const UsersNumber: FC = () => {
  const [period, setPeriod] = useState('1y');
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsersDaoUsersById(dao));
  const getUsersNumberLoading = useAppSelector(
    selectActionLoading(getUsersDaoUsers.typePrefix),
  );

  useEffect(() => {
    if (!users && !isPending(getUsersNumberLoading)) {
      dispatch(
        getUsersDaoUsers({
          contract,
          dao,
        }),
      ).catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    }
  }, [users, dao, contract, dispatch, getUsersNumberLoading]);

  const usersData = useFilterMetrics(period, users);

  return (
    <>
      <LoadingContainer hide={isSuccess(getUsersNumberLoading)} />

      <div className={styles.metricsContainer}>
        {usersData ? (
          <ChartLine
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
