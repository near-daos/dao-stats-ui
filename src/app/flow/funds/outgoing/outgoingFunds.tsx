import React, { FC, useEffect, useState } from 'react';
import { ChartBar, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useParams } from 'react-router';
import { useFilterBarMetrics, usePrepareLeaderboard } from 'src/hooks';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { selectActionLoading } from '../../../../store/loading';
import { isSuccess, isPending, isNotAsked } from '../../../../utils';
import { getFlowHistory, getFlowLeaderboard } from '../../../shared/flow/slice';
import {
  selectFlowHistory,
  selectFlowLeaderboard,
} from '../../../shared/flow/selectors';

import styles from '../../flow.module.scss';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const OutgoingFunds: FC = () => {
  const [period, setPeriod] = useState('1y');

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
    leaderboard: fundsLeaderboard?.outgoing ? fundsLeaderboard.outgoing : null,
  });

  const fundsData = useFilterBarMetrics(period, funds);

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
            data={fundsData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              { name: 'Outgoing', color: '#9D58E1', dataKey: 'outgoing' },
            ]}
            filter="outgoing"
          />
        ) : null}
        {activeTab === 'leaderboard' && fundsLeaderboardData ? (
          <Leaderboard
            isCurrency
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Total out' },
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
