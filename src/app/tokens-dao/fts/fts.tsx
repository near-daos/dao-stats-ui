import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { isPending, isSuccess } from 'src/utils';
import { Params } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import { selectTokensFtsDaoById } from 'src/app/shared/tokens/selectors';
import { getTokensDaoFts } from 'src/app/shared/tokens/slice';

export const Fts: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<Params>();
  const dispatch = useAppDispatch();

  const tokens = useAppSelector(selectTokensFtsDaoById(dao));
  const getTokensFnsLoading = useAppSelector(
    selectActionLoading(getTokensDaoFts.typePrefix),
  );

  useEffect(() => {
    if (!tokens && !isPending(getTokensFnsLoading)) {
      dispatch(
        getTokensDaoFts({
          contract,
          dao,
        }),
        // eslint-disable-next-line no-console
      ).catch((error: unknown) => console.error(error));
    }
  }, [dispatch, contract, getTokensFnsLoading, tokens, dao]);

  const activeData = useFilterMetrics(period, tokens);
  const periods = usePeriods(tokens?.metrics);

  return (
    <>
      <LoadingContainer hide={isSuccess(getTokensFnsLoading)} />
      <div className={styles.metricsContainer}>
        {activeData ? (
          <ChartLine
            periods={periods}
            data={activeData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              { name: 'Number of Fts', color: '#E33F84', dataKey: 'count' },
            ]}
          />
        ) : null}
      </div>
    </>
  );
};
