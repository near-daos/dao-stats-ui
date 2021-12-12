import React, { FC, useEffect, useState } from 'react';
import { ChartLine, Tabs, Leaderboard, LoadingContainer } from 'src/components';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useFilterMetrics, usePrepareLeaderboard } from 'src/hooks';

import {
  selectGovernanceProposals,
  selectGovernanceProposalsLeaderboard,
} from '../selectors';
import {
  getGovernanceProposals,
  getGovernanceProposalsLeaderboard,
} from '../slice';
import { isNotAsked, isPending, isSuccess } from '../../../utils';
import { selectActionLoading } from '../../../store/loading';

import styles from '../governance.module.scss';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const NumberOfProposals: FC = () => {
  const [period, setPeriod] = useState('1y');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);

  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const governanceProposalsLeaderboard = useAppSelector(
    selectGovernanceProposalsLeaderboard,
  );
  const governanceProposals = useAppSelector(selectGovernanceProposals);
  const governanceProposalsLeaderboardLoading = useAppSelector(
    selectActionLoading(getGovernanceProposalsLeaderboard.typePrefix),
  );
  const GovernanceProposalsLoading = useAppSelector(
    selectActionLoading(getGovernanceProposals.typePrefix),
  );

  useEffect(() => {
    (async () => {
      try {
        if (
          (!governanceProposals || isNotAsked(GovernanceProposalsLoading)) &&
          !isPending(GovernanceProposalsLoading)
        ) {
          await dispatch(
            getGovernanceProposals({
              contract,
            }),
          );
        }

        if (
          (!governanceProposalsLeaderboard ||
            isNotAsked(governanceProposalsLeaderboardLoading)) &&
          !isPending(governanceProposalsLeaderboardLoading)
        ) {
          await dispatch(
            getGovernanceProposalsLeaderboard({
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
    governanceProposals,
    GovernanceProposalsLoading,
    governanceProposalsLeaderboard,
    governanceProposalsLeaderboardLoading,
  ]);

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  const governanceProposalsLeaderboardData = usePrepareLeaderboard({
    leaderboard: governanceProposalsLeaderboard?.metrics
      ? governanceProposalsLeaderboard.metrics
      : null,
  });
  const governanceProposalsData = useFilterMetrics(period, governanceProposals);

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          isSuccess(GovernanceProposalsLoading) &&
          isSuccess(governanceProposalsLeaderboardLoading)
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
      <div className={styles.chart}>
        {activeTab === 'history-data' && governanceProposalsData ? (
          <ChartLine
            data={governanceProposalsData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Number of Proposals',
                color: '#E33F84',
                dataKey: 'count',
              },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' && governanceProposalsLeaderboardData ? (
          <Leaderboard
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'DAOs activity' },
              { value: 'Last 7 days', position: 'right' },
            ]}
            type="line"
            dataRows={governanceProposalsLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
