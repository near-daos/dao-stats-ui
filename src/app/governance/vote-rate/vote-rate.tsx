import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useFilterMetrics, usePrepareLeaderboard } from 'src/hooks';
import { selectActionLoading } from 'src/store/loading';
import { isNotAsked, isPending, isSuccess } from 'src/utils';
import {
  selectGovernanceVoteRate,
  selectGovernanceVoteRateLeaderboard,
} from 'src/app/shared/governance/selectors';
import {
  getGovernanceVoteRate,
  getGovernanceVoteRateLeaderboard,
} from 'src/app/shared/governance/slice';

import styles from 'src/styles/page.module.scss';

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
    if (
      isNotAsked(governanceVoteRateLoading) &&
      !isPending(governanceVoteRateLoading)
    ) {
      dispatch(
        getGovernanceVoteRate({
          contract,
        }),
        // eslint-disable-next-line no-console
      ).catch((error: unknown) => console.error(error));
    }

    if (
      isNotAsked(governanceVoteRateLeaderboardLoading) &&
      !isPending(governanceVoteRateLeaderboardLoading)
    ) {
      dispatch(
        getGovernanceVoteRateLeaderboard({
          contract,
        }),
        // eslint-disable-next-line no-console
      ).catch((error: unknown) => console.error(error));
    }
  }, [
    contract,
    dispatch,
    governanceVoteRateLoading,
    governanceVoteRateLeaderboardLoading,
  ]);

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  const governanceVoteRateData = useFilterMetrics(period, governanceVoteRate);
  const governanceVoteRateLeaderboardData = usePrepareLeaderboard({
    type: 'voteRate',
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
              { value: '# of Proposals' },
              { value: 'Vote through rate' },
              { value: 'Last 7 days', position: 'right' },
            ]}
            type="voteRate"
            dataRows={governanceVoteRateLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
