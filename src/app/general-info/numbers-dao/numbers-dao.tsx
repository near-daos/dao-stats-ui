import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine } from 'src/components';
import { useFilterMetrics } from 'src/hooks';

import { getGeneralDaos } from '../slice';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectGeneralDaos } from '../selectors';

import styles from './numbers-dao.module.scss';

export const NumbersDao: FC = () => {
  const [period, setPeriod] = useState('1y');

  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const daos = useAppSelector(selectGeneralDaos);

  useEffect(() => {
    (async () => {
      try {
        if (!daos) {
          await dispatch(getGeneralDaos({ contract }));
        }
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, [daos, period, contract, dispatch]);

  const daosData = useFilterMetrics(period, daos);

  return (
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
  );
};
