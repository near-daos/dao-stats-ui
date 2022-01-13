import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isFailed } from 'src/utils';
import { getUsersDaoUsers } from 'src/app/shared/users/slice';
import {
  selectUsersDaoUsersById,
  selectorError,
} from 'src/app/shared/users/selectors';

import styles from 'src/styles/page.module.scss';

export const UsersNumber: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsersDaoUsersById(dao));
  const error = useAppSelector(selectorError);
  const getUsersNumberLoading = useAppSelector(
    selectActionLoading(getUsersDaoUsers.typePrefix),
  );

  useEffect(() => {
    dispatch(
      getUsersDaoUsers({
        contract,
        dao,
      }),
    ).catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err.response);
    });
  }, [dao, contract, dispatch]);

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
      <div className={styles.metricsContainer}>
        {usersData ? (
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
