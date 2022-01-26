import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useMount } from 'react-use';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  selectFlowDaoTransactionsById,
  selectFlowError,
} from 'src/app/shared/flow/selectors';
import { getFlowDaoTransactions } from 'src/app/shared/flow/slice';
import { selectActionLoading } from 'src/app/shared';
import { isFailed, isSuccess } from 'src/utils';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const OutgoingTransactions: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectFlowError);
  const transactions = useAppSelector(selectFlowDaoTransactionsById(dao));
  const getFlowDaoTransactionsLoading = useAppSelector(
    selectActionLoading(getFlowDaoTransactions.typePrefix),
  );

  useMount(() => {
    if (!transactions) {
      dispatch(
        getFlowDaoTransactions({
          contract,
          dao,
        }),
      ).catch((err: unknown) => console.error(err));
    }
  });

  const transactionsData = useFilterMetrics(period, transactions);
  const periods = usePeriods(transactions?.metrics);

  return (
    <>
      <LoadingContainer
        hide={
          isSuccess(getFlowDaoTransactionsLoading) ||
          isFailed(getFlowDaoTransactionsLoading)
        }
      />
      {error ? <p className={styles.error}>{error}</p> : null}
      {transactionsData?.metrics?.length === 0 ? 'Not enough data' : null}
      <div className={styles.metricsContainer}>
        {transactionsData?.metrics?.length ? (
          <ChartLine
            data={transactionsData}
            period={period}
            setPeriod={setPeriod}
            periods={periods}
            lines={[
              {
                name: 'Outgoing Transactions',
                color: '#E33F84',
                dataKey: 'outgoing',
              },
            ]}
          />
        ) : null}
      </div>
    </>
  );
};
