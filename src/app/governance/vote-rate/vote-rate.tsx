import React, { FC, useCallback, useState } from 'react';
import { generatePath, useParams, useHistory } from 'react-router';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useFilterMetrics, usePeriods, usePrepareLeaderboard } from 'src/hooks';
import { selectActionLoading } from 'src/app/shared';
import { isFailed, isSuccess } from 'src/utils';
import {
  selectGovernanceError,
  selectGovernanceVoteRate,
  selectGovernanceVoteRateLeaderboard,
} from 'src/app/shared/governance/selectors';
import {
  clearGovernanceError,
  getGovernanceVoteRate,
  getGovernanceVoteRateLeaderboard,
} from 'src/app/shared/governance/slice';
import { ROUTES, UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';
import { useMount, useUnmount } from 'react-use';

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
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectGovernanceError);
  const governanceVoteRate = useAppSelector(selectGovernanceVoteRate);
  const governanceVoteRateLeaderboard = useAppSelector(
    selectGovernanceVoteRateLeaderboard,
  );
  const governanceVoteRateLeaderboardLoading = useAppSelector(
    selectActionLoading(getGovernanceVoteRateLeaderboard.typePrefix),
  );
  const governanceVoteRateLoading = useAppSelector(
    selectActionLoading(getGovernanceVoteRate.typePrefix),
  );

  useMount(() => {
    if (!governanceVoteRate) {
      dispatch(
        getGovernanceVoteRate({
          contract,
        }),
      ).catch((err) => console.error(err));
    }

    if (!governanceVoteRateLeaderboard) {
      dispatch(
        getGovernanceVoteRateLeaderboard({
          contract,
        }),
      ).catch((err) => console.error(err));
    }
  });

  useUnmount(() => {
    dispatch(clearGovernanceError());
  });

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
          (isSuccess(governanceVoteRateLoading) &&
            isSuccess(governanceVoteRateLeaderboardLoading)) ||
          isFailed(governanceVoteRateLoading) ||
          isFailed(governanceVoteRateLeaderboardLoading)
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
      {error ? <p className={styles.error}>{error}</p> : null}
      {governanceVoteRateData?.metrics?.length === 0 ? 'Not enough data' : null}
      <div className={styles.metricsContainer}>
        {activeTab === 'history-data' &&
        governanceVoteRateData &&
        governanceVoteRateData?.metrics?.length ? (
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
              { value: 'Last Month', position: 'right' },
            ]}
            type="voteRate"
            dataRows={governanceVoteRateLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
