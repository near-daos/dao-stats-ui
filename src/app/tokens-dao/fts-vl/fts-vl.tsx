import React, { FC, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/app/shared';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { isFailed, isSuccess } from 'src/utils';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import {
  selectTokensError,
  selectTokensFtsVlDaoById,
} from 'src/app/shared/tokens/selectors';
import {
  clearTokensError,
  getTokensDaoFtsVl,
} from 'src/app/shared/tokens/slice';
import { useMount, useUnmount } from 'react-use';

export const FtsVl: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectTokensError);

  const tokens = useAppSelector(selectTokensFtsVlDaoById(dao));
  const getTokensLoading = useAppSelector(
    selectActionLoading(getTokensDaoFtsVl.typePrefix),
  );

  useMount(() => {
    if (!tokens) {
      dispatch(
        getTokensDaoFtsVl({
          contract,
          dao,
        }),
      ).catch((err: unknown) => console.error(err));
    }
  });

  useUnmount(() => {
    dispatch(clearTokensError());
  });

  const tokensData = useFilterMetrics(period, tokens);
  const periods = usePeriods(tokens?.metrics);

  return (
    <>
      <LoadingContainer
        hide={isSuccess(getTokensLoading) || isFailed(getTokensLoading)}
      />
      {error ? <p className={styles.error}>{error}</p> : null}
      {tokensData?.metrics?.length === 0 ? 'Not enough data' : null}
      <div className={styles.metricsContainer}>
        {tokensData && tokensData?.metrics?.length ? (
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
