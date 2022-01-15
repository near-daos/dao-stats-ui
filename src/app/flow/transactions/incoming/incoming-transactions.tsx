import React, { FC, useEffect, useState, useCallback } from 'react';
import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useParams, generatePath, useHistory } from 'react-router';
import { useFilterMetrics, usePeriods, usePrepareLeaderboard } from 'src/hooks';
import { ROUTES } from 'src/constants';
import styles from 'src/styles/page.module.scss';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending, isNotAsked, isFailed } from 'src/utils';
import {
  getFlowTransactionsHistory,
  getFlowTransactionsLeaderboard,
} from 'src/app/shared/flow/slice';
import {
  selectFlowTransactionsHistory,
  selectFlowTransactionsLeaderboard,
} from 'src/app/shared/flow/selectors';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const IncomingTransactions: FC = () => {
  const [period, setPeriod] = useState('All');
  const history = useHistory();
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
    if (
      (!transactions || isNotAsked(getTransactionsLoading)) &&
      !isPending(getTransactionsLoading)
    ) {
      dispatch(
        getFlowTransactionsHistory({
          contract,
        }),
      ).catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    }

    if (
      (!transactionsLeaderboard ||
        isNotAsked(getTransactionsLeaderboardLoading)) &&
      !isPending(getTransactionsLeaderboardLoading)
    ) {
      dispatch(
        getFlowTransactionsLeaderboard({
          contract,
        }),
      );
    }
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

  const transactionsLeaderboardData = usePrepareLeaderboard({
    leaderboard: transactionsLeaderboard?.incoming
      ? transactionsLeaderboard.incoming
      : null,
  });

  const goToSingleDao = useCallback(
    (row) => {
      history.push(
        generatePath(ROUTES.flowDaoIncomingTransactions, {
          contract,
          dao: row.dao,
        }),
      );
    },
    [contract, history],
  );

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          (isSuccess(getTransactionsLoading) &&
            isSuccess(getTransactionsLeaderboardLoading)) ||
          isFailed(getTransactionsLoading) ||
          isFailed(getTransactionsLeaderboardLoading)
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
        {activeTab === 'leaderboard' && transactionsLeaderboardData ? (
          <Leaderboard
            onRowClick={goToSingleDao}
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Incoming Transactions' },
              { value: 'Last 7 days', position: 'right' },
            ]}
            type="line"
            dataRows={transactionsLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
