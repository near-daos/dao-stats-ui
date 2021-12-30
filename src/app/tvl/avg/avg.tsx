import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { isPending, isSuccess, isNotAsked } from 'src/utils';
import { Params } from 'src/api';
import { getTvlAvgTvl, selectTvlAvgTvl } from 'src/app/shared';

import styles from 'src/styles/page.module.scss';

export const Avg: FC = () => {
  const [period, setPeriod] = useState('All');

  const { contract } = useParams<Params>();
  const dispatch = useAppDispatch();
  const tvl = useAppSelector(selectTvlAvgTvl);
  const getTvlLoading = useAppSelector(
    selectActionLoading(getTvlAvgTvl.typePrefix),
  );

  useEffect(() => {
    if (isNotAsked(getTvlLoading) && !isPending(getTvlLoading)) {
      dispatch(
        getTvlAvgTvl({
          contract,
        }),
        // eslint-disable-next-line no-console
      ).catch((error: unknown) => console.error(error));
    }
  }, [dispatch, contract, getTvlLoading]);

  const tvlData = useFilterMetrics(period, tvl);
  const periods = usePeriods(tvl?.metrics);

  return (
    <>
      <LoadingContainer hide={isSuccess(getTvlLoading)} />
      <div className={styles.metricsContainer}>
        {tvlData ? (
          <ChartLine
            isCurrency
            periods={periods}
            data={tvlData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              { name: 'Avg. TVL per DAO', color: '#E33F84', dataKey: 'count' },
            ]}
          />
        ) : null}
      </div>
    </>
  );
};
