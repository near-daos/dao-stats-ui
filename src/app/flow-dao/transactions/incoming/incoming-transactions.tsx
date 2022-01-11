import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectFlowDaoIncomingTransactionsById } from 'src/app/shared/flow/selectors';
import { getFlowDaoIncomingTransactions } from 'src/app/shared/flow/slice';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending } from 'src/utils';

import styles from 'src/styles/page.module.scss';

export const IncomingTransactions: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();
  const IncomingTransactionsItems = useAppSelector(
    selectFlowDaoIncomingTransactionsById(dao),
  );
  const getFlowDaoIncomingTransactionsLoading = useAppSelector(
    selectActionLoading(getFlowDaoIncomingTransactions.typePrefix),
  );

  useEffect(() => {
    if (
      !IncomingTransactionsItems &&
      !isPending(getFlowDaoIncomingTransactionsLoading)
    ) {
      dispatch(
        getFlowDaoIncomingTransactions({
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
    getFlowDaoIncomingTransactionsLoading,
    IncomingTransactionsItems,
  ]);

  const activityData = useFilterMetrics(period, IncomingTransactionsItems);
  const periods = usePeriods(IncomingTransactionsItems?.metrics);

  return (
    <>
      <LoadingContainer
        hide={isSuccess(getFlowDaoIncomingTransactionsLoading)}
      />

      <div className={styles.metricsContainer}>
        {activityData && activityData?.metrics?.length ? (
          <ChartLine
            data={activityData}
            period={period}
            setPeriod={setPeriod}
            periods={periods}
            lines={[
              {
                name: 'Incoming transactions',
                color: '#E33F84',
                dataKey: 'incoming',
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
