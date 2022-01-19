import React, { FC, useEffect, useState } from 'react';
import { ChartLine, LoadingContainer } from 'src/components';
import { useParams } from 'react-router';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectGeneralAverageGroups } from 'src/app/shared/general/selectors';
import { getGeneralAverageGroups } from 'src/app/shared/general/slice';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending, isNotAsked, isFailed } from 'src/utils';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const AverageGroups: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const averageGroups = useAppSelector(selectGeneralAverageGroups);
  const generalAverageGroupsLoading = useAppSelector(
    selectActionLoading(getGeneralAverageGroups.typePrefix),
  );

  useEffect(() => {
    if (
      isNotAsked(generalAverageGroupsLoading) &&
      !isPending(generalAverageGroupsLoading)
    ) {
      dispatch(
        getGeneralAverageGroups({
          contract,
        }),
      ).catch((error: unknown) => {
        console.error(error);
      });
    }
  }, [contract, dispatch, generalAverageGroupsLoading]);

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
      <div className={styles.metricsContainer}>
        {averageGroupsData ? (
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
