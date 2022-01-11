import React, { FC, useEffect, useCallback, useState } from 'react';
import { ChartBar, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useParams, useHistory, generatePath } from 'react-router';
import { useFilterMetrics, usePeriods, usePrepareLeaderboard } from 'src/hooks';
import { ROUTES } from 'src/constants';
import styles from 'src/styles/page.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { selectActionLoading } from '../../../../store/loading';
import { isSuccess, isPending, isNotAsked } from '../../../../utils';
import { getFlowHistory, getFlowLeaderboard } from '../../../shared/flow/slice';
import {
  selectFlowHistory,
  selectFlowLeaderboard,
} from '../../../shared/flow/selectors';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const IncomingFunds: FC = () => {
  const [period, setPeriod] = useState('1y');
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const { contract } = useParams<{ contract: string }>();
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

  useEffect(() => {
    (async () => {
      try {
        if (
          (!funds || isNotAsked(getFundsLoading)) &&
          !isPending(getFundsLoading)
        ) {
          await dispatch(
            getFlowHistory({
              contract,
            }),
          );
        }

        if (
          (!fundsLeaderboard || isNotAsked(getFundsLeaderboardLoading)) &&
          !isPending(getFundsLeaderboardLoading)
        ) {
          await dispatch(
            getFlowLeaderboard({
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
    funds,
    fundsLeaderboard,
    period,
    contract,
    dispatch,
    getFundsLoading,
    getFundsLeaderboardLoading,
  ]);

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
          <ChartBar
            isCurrency
            data={fundsData}
            period={period}
            periods={periods}
            setPeriod={setPeriod}
            lines={[
              { name: 'Incoming', color: '#FFC300', dataKey: 'incoming' },
            ]}
            filter="incoming"
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
              { value: 'Last 7 days', position: 'right' },
            ]}
            type="line"
            dataRows={fundsLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
