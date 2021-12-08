import React, { FC, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';

import { ChartLine } from 'src/components';
import { getDateFromMow } from 'src/components/charts/helpers';

import { getGeneralDaos } from '../slice';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectGeneralDaos } from '../selectors';

import styles from './numbers-dao.module.scss';

const periods = ['7d', '1m', '3m', '6m', '1y'];

export const NumbersDao: FC = () => {
  const [period, setPeriod] = useState(periods[0]);

  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const daosData = useAppSelector(selectGeneralDaos);

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

  const daos = useMemo(
    () =>
      daosData?.metrics
        ? {
            metrics: daosData?.metrics.filter(
              (metric) => metric.timestamp > getDateFromMow(period),
            ),
          }
        : null,
    [daosData, period],
  );

  return (
    <div className={styles.chart}>
      <ChartLine
        data={daos}
        period={period}
        setPeriod={setPeriod}
        lines={[{ name: 'Number of dao', color: '#E33F84', dataKey: 'count' }]}
      />
    </div>
  );
};
