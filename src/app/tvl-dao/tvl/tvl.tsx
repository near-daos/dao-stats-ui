import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, LoadingContainer } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { isFailed, isSuccess } from 'src/utils';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import {
  selectTvlDaoTvlById,
  selectTvlError,
} from 'src/app/shared/tvl/selectors';
import { clearTvlError, getTvlDaoTvl } from 'src/app/shared/tvl/slice';

export const Tvl: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectTvlError);
  const tvl = useAppSelector(selectTvlDaoTvlById(dao));
  const getTvlDaoTvlLoading = useAppSelector(
    selectActionLoading(getTvlDaoTvl.typePrefix),
  );

  useMount(() => {
    if (!tvl) {
      dispatch(
        getTvlDaoTvl({
          contract,
          dao,
        }),
      ).catch((err: unknown) => console.error(err));
    }
  });

  useUnmount(() => {
    dispatch(clearTvlError());
  });

  const tvlData = useFilterMetrics(period, tvl);
  const periods = usePeriods(tvl?.metrics);

  return (
    <>
      <LoadingContainer
        hide={isSuccess(getTvlDaoTvlLoading) || isFailed(getTvlDaoTvlLoading)}
      />
      {error ? <p className={styles.error}>{error}</p> : null}
      {tvlData?.metrics?.length === 0 ? 'Not enough data' : null}
      <div className={styles.metricsContainer}>
        {tvlData && tvlData?.metrics?.length ? (
          <ChartLine
            isCurrency
            periods={periods}
            data={tvlData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Tvl',
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
