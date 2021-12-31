import React, { FC, useEffect, useState } from 'react';
import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useParams } from 'react-router';
import { useFilterMetrics, usePrepareLeaderboard } from 'src/hooks';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { selectActionLoading } from '../../../../store/loading';
import { isSuccess, isPending, isNotAsked } from '../../../../utils';
import {
  getFlowTransactionsHistory,
  getFlowTransactionsLeaderboard,
} from '../../slice';
import {
  selectFlowTransactionsHistory,
  selectFlowTransactionsLeaderboard,
} from '../../selectors';

import styles from '../../flow.module.scss';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const OutgoingTransactions: FC = () => {
  const [period, setPeriod] = useState('1y');

  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(selectFlowTransactionsHistory);
  const transactionsLeaderboard = useAppSelector(
    selectFlowTransactionsLeaderboard,
  );
  const getTransactionsLoading = useAppSelector(
    selectActionLoading(getFlowTransactionsHistory.typePrefix),
  );
  const getTransactionsLeaderboardLoading = useAppSelector(
    selectActionLoading(getFlowTransactionsLeaderboard.typePrefix),
  );

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    (async () => {
      try {
        if (
          (!transactions || isNotAsked(getTransactionsLoading)) &&
          !isPending(getTransactionsLoading)
        ) {
          await dispatch(
            getFlowTransactionsHistory({
              contract,
            }),
          );
        }

        if (
          (!transactionsLeaderboard ||
            isNotAsked(getTransactionsLeaderboardLoading)) &&
          !isPending(getTransactionsLeaderboardLoading)
        ) {
          await dispatch(
            getFlowTransactionsLeaderboard({
              contract,
            }),
          );
        }
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, [
    transactions,
    transactionsLeaderboard,
    period,
    contract,
    dispatch,
    getTransactionsLoading,
    getTransactionsLeaderboardLoading,
  ]);

  const trasactionsLeaderboardData = usePrepareLeaderboard({
    leaderboard: transactionsLeaderboard?.outgoing
      ? transactionsLeaderboard.outgoing
      : null,
  });

  const transactionsData = useFilterMetrics(period, transactions);

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          isSuccess(getTransactionsLoading) &&
          isSuccess(getTransactionsLeaderboardLoading)
        }
      />
      <div className={styles.tabWrapper}>
        <Tabs
          variant="small"
          options={tabOptions}
          className={styles.tabs}
          onChange={handleOnChange}
        />
      </div>

      <div className={styles.metricsContainer}>
        {activeTab === 'history-data' && transactionsData ? (
          <ChartLine
            data={transactionsData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Outgoing Transactions',
                color: '#E33F84',
                dataKey: 'outgoing',
              },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' && trasactionsLeaderboardData ? (
          <Leaderboard
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Outgoing Transactions' },
              { value: 'Last 7 days', position: 'right' },
            ]}
            type="line"
            dataRows={trasactionsLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
