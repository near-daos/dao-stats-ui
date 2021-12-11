import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import clsx from 'clsx';

import { ChartLine, Loading } from 'src/components';
import { useFilterMetrics } from 'src/hooks';

import { getGeneralDaos } from '../slice';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectGeneralDaos } from '../selectors';
import { RequestStatus } from '../../../store/types';
import { selectActionLoading } from '../../../store/loading';

import styles from './numbers-dao.module.scss';

export const NumbersDao: FC = () => {
  const [period, setPeriod] = useState('1y');
  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const daos = useAppSelector(selectGeneralDaos);
  const getGeneralDaosLoading = useAppSelector(
    selectActionLoading(getGeneralDaos.typePrefix),
  );

  useEffect(() => {
    if (!daos) {
      dispatch(getGeneralDaos({ contract })).catch((error: unknown) =>
        console.error(error),
      );
    }
  }, [daos, contract, dispatch]);

  const daosData = useFilterMetrics(period, daos);

  return (
    <>
      <div
        className={clsx(styles.loading, {
          [styles.showLoading]: getGeneralDaosLoading === RequestStatus.PENDING,
        })}
      >
        <Loading />
      </div>

      <div className={styles.chart}>
        {daos ? (
          <ChartLine
            key={period}
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
