import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { getGeneralDaos } from 'src/app/shared/general/slice';
import { selectGeneralDaos } from 'src/app/shared/general/selectors';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isNotAsked, isPending } from 'src/utils';

import styles from 'src/styles/page.module.scss';

export const NumbersDao: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const daos = useAppSelector(selectGeneralDaos);
  const getGeneralDaosLoading = useAppSelector(
    selectActionLoading(getGeneralDaos.typePrefix),
  );

  useEffect(() => {
    if (
      isNotAsked(getGeneralDaosLoading) &&
      !isPending(getGeneralDaosLoading)
    ) {
      dispatch(getGeneralDaos({ contract })).catch((error: unknown) =>
        // eslint-disable-next-line no-console
        console.error(error),
      );
    }
  }, [contract, dispatch, getGeneralDaosLoading]);

  const daosData = useFilterMetrics(period, daos);
  const periods = usePeriods(daos?.metrics);

  return (
    <>
      <LoadingContainer hide={isSuccess(getGeneralDaosLoading)} />

      <div className={styles.metricsContainer}>
        {daosData ? (
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
