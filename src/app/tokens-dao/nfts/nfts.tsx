import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { isPending, isSuccess } from 'src/utils';
import { Params } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import { selectTokensNftsDaoById } from 'src/app/shared/tokens/selectors';
import { getTokensDaoNfts } from 'src/app/shared/tokens/slice';

export const Nfts: FC = () => {
  const [period, setPeriod] = useState('All');

  const { contract, dao } = useParams<Params>();
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokensNftsDaoById(dao));
  const getTokensNftsLoading = useAppSelector(
    selectActionLoading(getTokensDaoNfts.typePrefix),
  );

  useEffect(() => {
    if (!tokens && !isPending(getTokensNftsLoading)) {
      dispatch(
        getTokensDaoNfts({
          contract,
          dao,
        }),
      ).catch((error: unknown) => console.error(error));
    }
  }, [dispatch, contract, getTokensNftsLoading, dao, tokens]);

  const activeData = useFilterMetrics(period, tokens);
  const periods = usePeriods(tokens?.metrics);

  return (
    <>
      <LoadingContainer hide={isSuccess(getTokensNftsLoading)} />
      <div className={styles.metricsContainer}>
        {activeData ? (
          <ChartLine
            periods={periods}
            data={activeData}
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
