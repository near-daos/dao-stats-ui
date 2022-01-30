import React, { FC, useState } from 'react';
import { useUnmount, useMount } from 'react-use';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  selectGeneralAverageGroups,
  selectGeneralError,
} from 'src/app/shared/general/selectors';
import {
  clearGeneralError,
  getGeneralAverageGroups,
} from 'src/app/shared/general/slice';
import { selectActionLoading } from 'src/app/shared';
import { isSuccess, isFailed } from 'src/utils';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const AverageGroups: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectGeneralError);
  const averageGroups = useAppSelector(selectGeneralAverageGroups);
  const generalAverageGroupsLoading = useAppSelector(
    selectActionLoading(getGeneralAverageGroups.typePrefix),
  );

  useMount(() => {
    if (!averageGroups) {
      dispatch(
        getGeneralAverageGroups({
          contract,
        }),
      ).catch((err: unknown) => {
        console.error(err);
      });
    }
  });

  useUnmount(() => {
    dispatch(clearGeneralError());
  });

  const averageGroupsData = useFilterMetrics(period, averageGroups);
  const periods = usePeriods(averageGroups?.metrics);

  return (
    <>
      <LoadingContainer
        hide={
          isSuccess(generalAverageGroupsLoading) ||
          isFailed(generalAverageGroupsLoading)
        }
      />
      {averageGroupsData?.metrics?.length === 0 ? 'Not enough data' : null}
      {error ? <p className={styles.error}>{error}</p> : null}
      <div className={styles.metricsContainer}>
        {averageGroupsData && averageGroupsData.metrics.length ? (
          <ChartLine
            roundPattern="0,0.00"
            periods={periods}
            data={averageGroupsData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Average Groups/DAO',
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
