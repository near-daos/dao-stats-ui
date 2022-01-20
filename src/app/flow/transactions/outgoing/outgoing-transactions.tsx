import React, { FC, useState, useCallback } from 'react';
import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useParams, generatePath, useHistory } from 'react-router';
import { useFilterMetrics, usePeriods, usePrepareLeaderboard } from 'src/hooks';
import { ROUTES, UrlParams } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isFailed } from 'src/utils';
import {
  clearFlowError,
  getFlowTransactionsHistory,
  getFlowTransactionsLeaderboard,
} from 'src/app/shared/flow/slice';
import {
  selectFlowError,
  selectFlowTransactionsHistory,
  selectFlowTransactionsLeaderboard,
} from 'src/app/shared/flow/selectors';
import styles from 'src/styles/page.module.scss';
import { useMount, useUnmount } from 'react-use';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const OutgoingTransactions: FC = () => {
  const [period, setPeriod] = useState('All');
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectFlowError);
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

  useMount(() => {
    if (!transactions) {
      dispatch(
        getFlowTransactionsHistory({
          contract,
        }),
      ).catch((err: unknown) => console.error(err));
    }

    if (!transactionsLeaderboard) {
      dispatch(
        getFlowTransactionsLeaderboard({
          contract,
        }),
      ).catch((err: unknown) => console.error(err));
    }
  });

  useUnmount(() => {
    dispatch(clearFlowError());
  });

  const transactionsLeaderboardData = usePrepareLeaderboard({
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
      {activeTab === 'history-data' && transactionsData?.metrics?.length === 0
        ? 'Not enough data'
        : null}
      {error ? <p className={styles.error}>{error}</p> : null}
      <div className={styles.metricsContainer}>
        {activeTab === 'history-data' &&
        transactionsData &&
        transactionsData?.metrics?.length ? (
          <ChartLine
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
        {activeTab === 'leaderboard' && transactionsLeaderboardData ? (
          <Leaderboard
            onRowClick={goToSingleDao}
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Outgoing Transactions' },
              { value: 'Last Month', position: 'right' },
            ]}
            type="line"
            dataRows={transactionsLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
