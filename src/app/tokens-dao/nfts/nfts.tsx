import React, { FC, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { isFailed, isSuccess } from 'src/utils';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import {
  selectTokensError,
  selectTokensNftsDaoById,
} from 'src/app/shared/tokens/selectors';
import {
  clearTokensError,
  getTokensDaoNfts,
} from 'src/app/shared/tokens/slice';
import { useMount, useUnmount } from 'react-use';

export const Nfts: FC = () => {
  const [period, setPeriod] = useState('All');
  const error = useAppSelector(selectTokensError);
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokensNftsDaoById(dao));
  const getTokensNftsLoading = useAppSelector(
    selectActionLoading(getTokensDaoNfts.typePrefix),
  );

  useMount(() => {
    if (!tokens) {
      dispatch(
        getTokensDaoNfts({
          contract,
          dao,
        }),
      ).catch((err) => console.error(err));
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
        hide={isSuccess(getTokensNftsLoading) || isFailed(getTokensNftsLoading)}
      />
      {error ? <p className={styles.error}>{error}</p> : null}
      {tokensData?.metrics?.length === 0 ? 'Not enough data' : null}
      <div className={styles.metricsContainer}>
        {tokensData && tokensData?.metrics?.length ? (
          <ChartLine
            periods={periods}
            data={tokensData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              { name: 'Number of Nfts', color: '#E33F84', dataKey: 'count' },
            ]}
          />
        ) : null}
      </div>
    </>
  );
};
