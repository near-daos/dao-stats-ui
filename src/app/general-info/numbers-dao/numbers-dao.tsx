import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics } from 'src/hooks';

import { getGeneralDaos } from '../slice';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectGeneralDaos } from '../selectors';
import { selectActionLoading } from '../../../store/loading';
import { isSuccess, isNotAsked, isPending } from '../../../utils';

import styles from '../general-info.module.scss';

export const NumbersDao: FC = () => {
  const [period, setPeriod] = useState('1y');
  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const daos = useAppSelector(selectGeneralDaos);
  const getGeneralDaosLoading = useAppSelector(
    selectActionLoading(getGeneralDaos.typePrefix),
  );

  useEffect(() => {
    if (
      (!daos || isNotAsked(getGeneralDaosLoading)) &&
      !isPending(getGeneralDaosLoading)
    ) {
      dispatch(getGeneralDaos({ contract })).catch((error: unknown) =>
        console.error(error),
      );
    }
  }, [daos, contract, dispatch, getGeneralDaosLoading]);

  const daosData = useFilterMetrics(period, daos);

  return (
    <>
      <LoadingContainer hide={isSuccess(getGeneralDaosLoading)} />

      <div className={styles.metricsContainer}>
        {daosData ? (
          <ChartLine
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
