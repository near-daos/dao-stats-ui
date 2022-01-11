import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectFlowDaoOutgoingTransactionsById } from 'src/app/shared/flow/selectors';
import { getFlowDaoOutgoingTransactions } from 'src/app/shared/flow/slice';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending } from 'src/utils';

import styles from 'src/styles/page.module.scss';

export const OutgoingTransactions: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();
  const outgoingTransactionsItems = useAppSelector(
    selectFlowDaoOutgoingTransactionsById(dao),
  );
  const getFlowDaoOutgoingTransactionsLoading = useAppSelector(
    selectActionLoading(getFlowDaoOutgoingTransactions.typePrefix),
  );

  useEffect(() => {
    if (
      !outgoingTransactionsItems &&
      !isPending(getFlowDaoOutgoingTransactionsLoading)
    ) {
      dispatch(
        getFlowDaoOutgoingTransactions({
          contract,
          dao,
        }),
      ).catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    }
  }, [
    contract,
    dao,
    dispatch,
    getFlowDaoOutgoingTransactionsLoading,
    outgoingTransactionsItems,
  ]);

  const transactionsData = useFilterMetrics(period, outgoingTransactionsItems);
  const periods = usePeriods(outgoingTransactionsItems?.metrics);

  return (
    <>
      <LoadingContainer
        hide={isSuccess(getFlowDaoOutgoingTransactionsLoading)}
      />

      <div className={styles.metricsContainer}>
        {transactionsData && transactionsData?.metrics?.length ? (
          <ChartLine
            data={transactionsData}
            period={period}
            setPeriod={setPeriod}
            periods={periods}
            lines={[
              {
                name: 'Outgoing Transactions',
                color: '#E33F84',
                dataKey: 'ountgoing',
              },
            ]}
          />
        ) : (
          'It doesn`t have enough data to show chart'
        )}
      </div>
    </>
  );
};
