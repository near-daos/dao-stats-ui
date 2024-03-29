import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  selectGeneralError,
  selectGeneralDaoGroupsById,
} from 'src/app/shared/general/selectors';
import {
  clearGeneralError,
  getGeneralDaoGroups,
} from 'src/app/shared/general/slice';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isFailed } from 'src/utils';
import { UrlParams } from 'src/constants';
import styles from 'src/styles/page.module.scss';

export const Groups: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectGeneralError);
  const groups = useAppSelector(selectGeneralDaoGroupsById(dao));
  const getGeneralDaoGroupsLoading = useAppSelector(
    selectActionLoading(getGeneralDaoGroups.typePrefix),
  );

  useMount(() => {
    if (!groups) {
      dispatch(
        getGeneralDaoGroups({
          contract,
          dao,
        }),
      ).catch((err: unknown) => {
        console.error(err);
      });
    }
  });

  useUnmount(() => {
    dispatch(clearGeneralError());
  });

  const groupsData = useFilterMetrics(period, groups);
  const periods = usePeriods(groups?.metrics);

  return (
    <>
      <LoadingContainer
        hide={
          isSuccess(getGeneralDaoGroupsLoading) ||
          isFailed(getGeneralDaoGroupsLoading)
        }
      />
      <div className={styles.metricsContainer}>
        {groupsData?.metrics?.length === 0 ? 'Not enough data' : null}
        {error ? <p className={styles.error}>{error}</p> : null}
        {groupsData && groupsData?.metrics?.length > 0 ? (
          <ChartLine
            periods={periods}
            data={groupsData}
            period={period}
            setPeriod={setPeriod}
            lines={[{ name: 'Groups', color: '#E33F84', dataKey: 'count' }]}
          />
        ) : null}
      </div>
    </>
  );
};
