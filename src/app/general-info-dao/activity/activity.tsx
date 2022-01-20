import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  selectGeneralDaoActivityById,
  selectGeneralError,
} from 'src/app/shared/general/selectors';
import {
  clearGeneralError,
  getGeneralDaoActivity,
} from 'src/app/shared/general/slice';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending, isFailed } from 'src/utils';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const Activity: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectGeneralError);
  const activity = useAppSelector(selectGeneralDaoActivityById(dao));
  const getGeneralDaoActivityLoading = useAppSelector(
    selectActionLoading(getGeneralDaoActivity.typePrefix),
  );

  useMount(() => {
    if (!activity && !isPending(getGeneralDaoActivityLoading)) {
      dispatch(
        getGeneralDaoActivity({
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

  const activityData = useFilterMetrics(period, activity);
  const periods = usePeriods(activity?.metrics);

  return (
    <>
      <LoadingContainer
        hide={
          isSuccess(getGeneralDaoActivityLoading) ||
          isFailed(getGeneralDaoActivityLoading)
        }
      />
      <div className={styles.metricsContainer}>
        {activityData?.metrics?.length === 0 ? 'Not enough data' : null}
        {error ? <p className={styles.error}>{error}</p> : null}
        {activityData && activityData?.metrics?.length > 0 ? (
          <ChartLine
            data={activityData}
            period={period}
            setPeriod={setPeriod}
            periods={periods}
            lines={[{ name: 'Activity', color: '#E33F84', dataKey: 'count' }]}
          />
        ) : null}
      </div>
    </>
  );
};
