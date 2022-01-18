import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { isPending, isSuccess } from 'src/utils';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import { selectTokensFtsVlDaoById } from 'src/app/shared/tokens/selectors';
import { getTokensDaoFtsVl } from 'src/app/shared/tokens/slice';

export const FtsVl: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();

  const tokens = useAppSelector(selectTokensFtsVlDaoById(dao));
  const getTokensLoading = useAppSelector(
    selectActionLoading(getTokensDaoFtsVl.typePrefix),
  );

  useEffect(() => {
    if (!tokens && !isPending(getTokensLoading)) {
      dispatch(
        getTokensDaoFtsVl({
          contract,
          dao,
        }),
      ).catch((error: unknown) => console.error(error));
    }
  }, [dispatch, contract, getTokensLoading, tokens, dao]);

  const tokensData = useFilterMetrics(period, tokens);
  const periods = usePeriods(tokens?.metrics);

  return (
    <>
      <LoadingContainer hide={isSuccess(getTokensLoading)} />
      <div className={styles.metricsContainer}>
        {tokensData ? (
          <ChartLine
            isCurrency
            periods={periods}
            data={tokensData}
            period={period}
            setPeriod={setPeriod}
            lines={[{ name: 'VL of Fts', color: '#E33F84', dataKey: 'count' }]}
          />
        ) : null}
      </div>
    </>
  );
};
