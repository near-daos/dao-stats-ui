import React, { FC, useEffect, useState } from 'react';
import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useFilterMetrics, usePrepareLeaderboard } from 'src/hooks';
import { useParams } from 'react-router';

import {
  selectGovernanceVoteRate,
  selectGovernanceVoteRateLeaderboard,
} from '../selectors';
import {
  getGovernanceVoteRate,
  getGovernanceVoteRateLeaderboard,
} from '../slice';
import { selectActionLoading } from '../../../store/loading';
import { isNotAsked, isPending, isSuccess } from '../../../utils';

import styles from '../governance.module.scss';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const VoteRate: FC = () => {
  const [period, setPeriod] = useState('1y');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);

  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const governanceVoteRateLeaderboard = useAppSelector(
    selectGovernanceVoteRateLeaderboard,
  );
  const governanceVoteRate = useAppSelector(selectGovernanceVoteRate);

  const governanceVoteRateLeaderboardLoading = useAppSelector(
    selectActionLoading(getGovernanceVoteRateLeaderboard.typePrefix),
  );
  const governanceVoteRateLoading = useAppSelector(
    selectActionLoading(getGovernanceVoteRate.typePrefix),
  );

  useEffect(() => {
    (async () => {
      try {
        if (
          (!governanceVoteRate || isNotAsked(governanceVoteRateLoading)) &&
          !isPending(governanceVoteRateLoading)
        ) {
          await dispatch(
            getGovernanceVoteRate({
              contract,
            }),
          );
        }

        if (
          (!governanceVoteRateLeaderboard ||
            isNotAsked(governanceVoteRateLeaderboardLoading)) &&
          !isPending(governanceVoteRateLeaderboardLoading)
        ) {
          await dispatch(
            getGovernanceVoteRateLeaderboard({
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
    period,
    contract,
    dispatch,
    governanceVoteRate,
    governanceVoteRateLoading,
    governanceVoteRateLeaderboard,
    governanceVoteRateLeaderboardLoading,
  ]);

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  const governanceVoteRateData = useFilterMetrics(period, governanceVoteRate);
  const governanceVoteRateLeaderboardData = usePrepareLeaderboard({
    leaderboard: governanceVoteRateLeaderboard?.metrics
      ? governanceVoteRateLeaderboard.metrics
      : null,
  });

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          isSuccess(governanceVoteRateLoading) &&
          isSuccess(governanceVoteRateLeaderboardLoading)
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
        {activeTab === 'history-data' && governanceVoteRateData ? (
          <ChartLine
            data={governanceVoteRateData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Vote through rate',
                color: '#E33F84',
                dataKey: 'count',
              },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' && governanceVoteRateLeaderboardData ? (
          <Leaderboard
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Vote through rate' },
              { value: 'Last 7 days', position: 'right' },
            ]}
            type="line"
            dataRows={governanceVoteRateLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
