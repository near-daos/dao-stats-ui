import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isFailed } from 'src/utils';
import { getUsersDaoMembers } from 'src/app/shared/users/slice';
import {
  selectorError,
  selectUsersDaoMembersById,
} from 'src/app/shared/users/selectors';

import styles from 'src/styles/page.module.scss';

export const Members: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();

  const error = useAppSelector(selectorError);
  const users = useAppSelector(selectUsersDaoMembersById(dao));
  const getUsersNumberLoading = useAppSelector(
    selectActionLoading(getUsersDaoMembers.typePrefix),
  );

  useEffect(() => {
    dispatch(
      getUsersDaoMembers({
        contract,
        dao,
      }),
    ).catch((err: unknown) => {
      // eslint-disable-next-line no-console
      console.error(err);
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
            lines={[{ name: 'Members', color: '#E33F84', dataKey: 'count' }]}
          />
        ) : null}
      </div>
    </>
  );
};
