import React, { FC, useCallback, useEffect, useState } from 'react';
import { generatePath, useParams, useHistory } from 'react-router';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useFilterMetrics, usePeriods, usePrepareLeaderboard } from 'src/hooks';
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
import { ROUTES } from '../../../constants';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const VoteRate: FC = () => {
  const [period, setPeriod] = useState('All');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const history = useHistory();
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
  const periods = usePeriods(governanceVoteRate?.metrics);

  const governanceVoteRateLeaderboardData = usePrepareLeaderboard({
    type: 'voteRate',
    leaderboard: governanceVoteRateLeaderboard?.metrics || null,
  });

  const goToSingleDao = useCallback(
    (row) => {
      history.push(
        generatePath(ROUTES.governanceVoteRateDao, { contract, dao: row.dao }),
      );
    },
    [contract, history],
  );

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
            periods={periods}
            data={governanceVoteRateData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Vote through rate, %',
                color: '#E33F84',
                dataKey: 'count',
              },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' && governanceVoteRateLeaderboardData ? (
          <Leaderboard
            onRowClick={goToSingleDao}
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
