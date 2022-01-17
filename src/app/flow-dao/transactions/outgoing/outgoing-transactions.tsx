import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useMount } from 'react-use';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectFlowDaoTransactionsById } from 'src/app/shared/flow/selectors';
import { getFlowDaoTransactions } from 'src/app/shared/flow/slice';
import { selectActionLoading } from 'src/store/loading';
import { isFailed, isSuccess } from 'src/utils';
import { Params } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const OutgoingTransactions: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<Params>();
  const dispatch = useAppDispatch();
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
      ).catch((error: unknown) => {
        console.error(error);
      });
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

      <div className={styles.metricsContainer}>
        {transactionsData?.metrics?.length === 0 ? 'Not enough data' : null}
        {transactionsData && transactionsData?.metrics?.length ? (
          <ChartLine
            data={transactionsData}
            period={period}
            setPeriod={setPeriod}
            periods={periods}
            lines={[
              {
                name: 'Outgoing of Transactions',
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
