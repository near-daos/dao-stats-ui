import React, { FC, useCallback, useState } from 'react';
import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useParams, useHistory, generatePath } from 'react-router';
import { useFilterMetrics, usePeriods, usePrepareLeaderboard } from 'src/hooks';
import { UrlParams, ROUTES } from 'src/constants';
import styles from 'src/styles/page.module.scss';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isNotAsked } from 'src/utils';
import {
  clearFlowError,
  getFlowHistory,
  getFlowLeaderboard,
} from 'src/app/shared/flow/slice';
import {
  selectFlowHistory,
  selectFlowLeaderboard,
} from 'src/app/shared/flow/selectors';
import { useMount, useUnmount } from 'react-use';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const IncomingFunds: FC = () => {
  const [period, setPeriod] = useState('All');
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const funds = useAppSelector(selectFlowHistory);
  const fundsLeaderboard = useAppSelector(selectFlowLeaderboard);
  const getFundsLoading = useAppSelector(
    selectActionLoading(getFlowHistory.typePrefix),
  );
  const getFundsLeaderboardLoading = useAppSelector(
    selectActionLoading(getFlowLeaderboard.typePrefix),
  );

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  useMount(() => {
    if (isNotAsked(getFundsLoading)) {
      dispatch(
        getFlowHistory({
          contract,
        }),
      ).catch((error: unknown) => console.error(error));
    }

    if (isNotAsked(getFundsLeaderboardLoading)) {
      dispatch(
        getFlowLeaderboard({
          contract,
        }),
      ).catch((error: unknown) => console.error(error));
    }
  });

  useUnmount(() => {
    dispatch(clearFlowError());
  });

  const fundsLeaderboardData = usePrepareLeaderboard({
    leaderboard: fundsLeaderboard?.incoming ? fundsLeaderboard.incoming : null,
  });

  const fundsData = useFilterMetrics(period, funds);
  const periods = usePeriods(funds?.metrics);

  const goToSingleDao = useCallback(
    (row) => {
      history.push(generatePath(ROUTES.flowDao, { contract, dao: row.dao }));
    },
    [contract, history],
  );

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          isSuccess(getFundsLoading) && isSuccess(getFundsLeaderboardLoading)
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
        {activeTab === 'history-data' && fundsData ? (
          <ChartLine
            isCurrency
            data={fundsData}
            period={period}
            setPeriod={setPeriod}
            periods={periods}
            lines={[
              { name: 'Total In', color: '#E33F84', dataKey: 'incoming' },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' && fundsLeaderboardData ? (
          <Leaderboard
            isCurrency
            onRowClick={goToSingleDao}
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Total in' },
              { value: 'Last Month', position: 'right' },
            ]}
            type="line"
            dataRows={fundsLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
