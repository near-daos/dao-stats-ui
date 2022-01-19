import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { isPending, isSuccess } from 'src/utils';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import { selectTvlDaoBountiesNumberById } from 'src/app/shared/tvl/selectors';
import { getTvlDaoBountiesNumber } from 'src/app/shared/tvl/slice';

export const BountiesNumber: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();

  const tvl = useAppSelector(selectTvlDaoBountiesNumberById(dao));
  const getTvlDaoBountiesNumberLoading = useAppSelector(
    selectActionLoading(getTvlDaoBountiesNumber.typePrefix),
  );

  useEffect(() => {
    if (!tvl && !isPending(getTvlDaoBountiesNumberLoading)) {
      dispatch(
        getTvlDaoBountiesNumber({
          contract,
          dao,
        }),
      ).catch((error: unknown) => console.error(error));
    }
  }, [dispatch, contract, getTvlDaoBountiesNumberLoading, tvl, dao]);

  const tvlData = useFilterMetrics(period, tvl);
  const periods = usePeriods(tvl?.metrics);

  return (
    <>
      <LoadingContainer hide={isSuccess(getTvlDaoBountiesNumberLoading)} />
      <div className={styles.metricsContainer}>
        {tvlData ? (
          <ChartLine
            periods={periods}
            data={tvlData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Number of Bounties',
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
