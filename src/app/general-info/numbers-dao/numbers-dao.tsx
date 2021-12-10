import React, { FC, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';

import { ChartLine } from 'src/components';
import { getDateFromMow } from 'src/components/charts/helpers';

import { getGeneralDaos } from '../slice';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectGeneralDaos } from '../selectors';

import styles from './numbers-dao.module.scss';
import { useFilterMetrics } from '../../../hooks';

export const NumbersDao: FC = () => {
  const [period, setPeriod] = useState('1y');

  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const daos = useAppSelector(selectGeneralDaos);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(
          getGeneralDaos({ contract, from: String(getDateFromMow(period)) }),
        );
      } catch (error: unknown) {
        console.error(error);
      }
    })();
  }, [period, contract, dispatch]);

  const daosData = useFilterMetrics(period, daos);

  return (
    <div className={styles.chart}>
      {daos ? (
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
  );
};
