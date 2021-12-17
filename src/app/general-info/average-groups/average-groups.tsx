import React, { FC, useEffect, useState } from 'react';
import { ChartLine, LoadingContainer } from 'src/components';
import { useParams } from 'react-router';
import { useFilterMetrics } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectGeneralAverageGroups } from 'src/app/shared/general/selectors';
import { getGeneralAverageGroups } from 'src/app/shared/general/slice';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending, isNotAsked } from 'src/utils';

import styles from 'src/styles/page.module.scss';

export const AverageGroups: FC = () => {
  const [period, setPeriod] = useState('1y');
  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const averageGroups = useAppSelector(selectGeneralAverageGroups);
  const generalAverageGroupsLoading = useAppSelector(
    selectActionLoading(getGeneralAverageGroups.typePrefix),
  );

  useEffect(() => {
    if (
      (!averageGroups || isNotAsked(generalAverageGroupsLoading)) &&
      !isPending(generalAverageGroupsLoading)
    ) {
      dispatch(
        getGeneralAverageGroups({
          contract,
        }),
      ).catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    }
  }, [period, contract, dispatch, averageGroups, generalAverageGroupsLoading]);

  const averageGroupsData = useFilterMetrics(period, averageGroups);

  return (
    <>
      <LoadingContainer hide={isSuccess(generalAverageGroupsLoading)} />
      <div className={styles.metricsContainer}>
        {averageGroupsData ? (
          <ChartLine
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
