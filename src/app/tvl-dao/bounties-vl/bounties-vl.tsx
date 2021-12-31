import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { isPending, isSuccess } from 'src/utils';
import { Params } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import { selectTvlDaoBountiesVlById } from 'src/app/shared/tvl/selectors';
import { getTvlDaoBountiesVl } from 'src/app/shared/tvl/slice';

export const BountiesVl: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<Params>();
  const dispatch = useAppDispatch();

  const tvl = useAppSelector(selectTvlDaoBountiesVlById(dao));
  const getTvlDaoBountiesNumberLoading = useAppSelector(
    selectActionLoading(getTvlDaoBountiesVl.typePrefix),
  );

  useEffect(() => {
    if (!tvl && !isPending(getTvlDaoBountiesNumberLoading)) {
      dispatch(
        getTvlDaoBountiesVl({
          contract,
          dao,
        }),
        // eslint-disable-next-line no-console
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
            isCurrency
            periods={periods}
            data={tvlData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'VL of Bounties',
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
