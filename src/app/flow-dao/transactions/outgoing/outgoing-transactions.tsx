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

export const OutgoingTransactions: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectFlowDaoTransactionsById(dao));
  const getFlowDaoTransactionsLoading = useAppSelector(
    selectActionLoading(getFlowDaoTransactions.typePrefix),
  );

  useEffect(() => {
    if (!transactions && !isPending(getFlowDaoTransactionsLoading)) {
      dispatch(
        getFlowDaoTransactions({
          contract,
          dao,
        }),
      ).catch((error: unknown) => {
        console.error(error);
      });
    }
  }, [contract, dao, dispatch, getFlowDaoTransactionsLoading, transactions]);

  const transactionsData = useFilterMetrics(period, transactions);
  const periods = usePeriods(transactions?.metrics);

  return (
    <>
      <LoadingContainer hide={isSuccess(getFlowDaoTransactionsLoading)} />

      <div className={styles.metricsContainer}>
        {transactionsData?.metrics?.length === 0
          ? 'It doesn`t have enough data to show chart'
          : null}
        {transactionsData ? (
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
