import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import {
  clearGeneralError,
  getGeneralDaos,
} from 'src/app/shared/general/slice';
import {
  selectGeneralDaos,
  selectGeneralError,
} from 'src/app/shared/general/selectors';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isFailed } from 'src/utils';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const NumbersDao: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectGeneralError);
  const daos = useAppSelector(selectGeneralDaos);
  const getGeneralDaosLoading = useAppSelector(
    selectActionLoading(getGeneralDaos.typePrefix),
  );

  useMount(() => {
    if (!daos) {
      dispatch(getGeneralDaos({ contract })).catch((err: unknown) =>
        console.error(err),
      );
    }
  });

  useUnmount(() => {
    dispatch(clearGeneralError());
  });

  const daosData = useFilterMetrics(period, daos);
  const periods = usePeriods(daos?.metrics);

  return (
    <>
      <LoadingContainer
        hide={
          isSuccess(getGeneralDaosLoading) || isFailed(getGeneralDaosLoading)
        }
      />
      {daosData?.metrics?.length === 0 ? 'Not enough data' : null}
      {error ? <p className={styles.error}>{error}</p> : null}
      <div className={styles.metricsContainer}>
        {daosData && daosData.metrics.length ? (
          <ChartLine
            periods={periods}
            data={daosData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              { name: 'Number of dao', color: '#E33F84', dataKey: 'count' },
            ]}
          />
        ) : null}
      </div>
    </>
  );
};
