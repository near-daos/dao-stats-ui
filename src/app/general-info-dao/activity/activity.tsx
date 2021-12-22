import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectGeneralDaoActivityById } from 'src/app/shared/general/selectors';
import { getGeneralDaoActivity } from 'src/app/shared/general/slice';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending } from 'src/utils';

import styles from 'src/styles/page.module.scss';

export const Activity: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();
  const activityItems = useAppSelector(selectGeneralDaoActivityById(dao));
  const getGeneralDaoActivityLoading = useAppSelector(
    selectActionLoading(getGeneralDaoActivity.typePrefix),
  );

  useEffect(() => {
    if (!activityItems && !isPending(getGeneralDaoActivityLoading)) {
      dispatch(
        getGeneralDaoActivity({
          contract,
          dao,
        }),
      ).catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    }
  }, [contract, dao, dispatch, getGeneralDaoActivityLoading, activityItems]);

  const activityData = useFilterMetrics(period, activityItems);
  const periods = usePeriods(activityItems?.metrics);

  return (
    <>
      <LoadingContainer hide={isSuccess(getGeneralDaoActivityLoading)} />

      <div className={styles.metricsContainer}>
        {activityData ? (
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
