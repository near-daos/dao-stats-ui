import React, { FC, useEffect, useState, useCallback } from 'react';
import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useParams, generatePath, useHistory } from 'react-router';
import { useFilterMetrics, usePeriods, usePrepareLeaderboard } from 'src/hooks';
import { ROUTES } from 'src/constants';
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

export const OutgoingTransactions: FC = () => {
  const [period, setPeriod] = useState('1y');
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
  const periods = usePeriods(transactions?.metrics);
  const goToSingleDao = useCallback(
    (row) => {
      history.push(
        generatePath(ROUTES.flowDaoOutgoingTransactions, {
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
            period={period}
            periods={periods}
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
            isCurrency
            onRowClick={goToSingleDao}
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
