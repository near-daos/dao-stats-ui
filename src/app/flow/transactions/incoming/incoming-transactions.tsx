import React, { FC, useEffect, useState } from 'react';
import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useParams } from 'react-router';
import { useFilterMetrics, usePeriods, usePrepareLeaderboard } from 'src/hooks';
import styles from 'src/styles/page.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { selectActionLoading } from '../../../../store/loading';
import { isSuccess, isPending, isNotAsked } from '../../../../utils';
import {
  getFlowTransactionsHistory,
  getFlowTransactionsLeaderboard,
} from '../../../shared/flow/slice';
import {
  selectFlowTransactionsHistory,
  selectFlowTransactionsLeaderboard,
} from '../../../shared/flow/selectors';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const IncomingTransactions: FC = () => {
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

  const transactionsData = useFilterMetrics(period, transactions);
  const periods = usePeriods(transactions?.metrics);

  const trasactionsLeaderboardData = usePrepareLeaderboard({
    leaderboard: transactionsLeaderboard?.incoming
      ? transactionsLeaderboard.incoming
      : null,
  });

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
            isCurrency
            data={transactionsData}
            periods={periods}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Incoming Transactions',
                color: '#E33F84',
                dataKey: 'incoming',
              },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' && trasactionsLeaderboardData ? (
          <Leaderboard
            isCurrency
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Incoming Transactions' },
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
