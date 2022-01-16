import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectFlowDaoTransactionsById } from 'src/app/shared/flow/selectors';
import { getFlowDaoTransactions } from 'src/app/shared/flow/slice';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending } from 'src/utils';

import styles from 'src/styles/page.module.scss';

export const IncomingTransactions: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();
  const transaction = useAppSelector(selectFlowDaoTransactionsById(dao));
  const getFlowDaoTransactionLoading = useAppSelector(
    selectActionLoading(getFlowDaoTransactions.typePrefix),
  );

  useEffect(() => {
    if (!transaction && !isPending(getFlowDaoTransactionLoading)) {
      dispatch(
        getFlowDaoTransactions({
          contract,
          dao,
        }),
      ).catch((error: unknown) => {
        console.error(error);
      });
    }
  }, [contract, dao, dispatch, getFlowDaoTransactionLoading, transaction]);

  const transactionData = useFilterMetrics(period, transaction);
  const periods = usePeriods(transaction?.metrics);

  return (
    <>
      <LoadingContainer hide={isSuccess(getFlowDaoTransactionLoading)} />

      <div className={styles.metricsContainer}>
        {transactionData?.metrics?.length === 0
          ? 'It doesn`t have enough data to show chart'
          : null}
        {transactionData ? (
          <ChartLine
            data={transactionData}
            period={period}
            setPeriod={setPeriod}
            periods={periods}
            lines={[
              {
                name: 'Incoming Transactions',
                color: '#E33F84',
                dataKey: 'incoming',
              },
            ]}
          />
        ) : null}
      </div>
    </>
  );
};
