import React, { FC, useCallback, useState } from 'react';
import { ChartLine, Tabs, Leaderboard, LoadingContainer } from 'src/components';
import { generatePath, useHistory, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useFilterMetrics, usePeriods, usePrepareLeaderboard } from 'src/hooks';
import { isFailed, isSuccess } from 'src/utils';
import { selectActionLoading } from 'src/store/loading';
import {
  selectGovernanceError,
  selectGovernanceProposals,
  selectGovernanceProposalsLeaderboard,
} from 'src/app/shared/governance/selectors';
import {
  clearGovernanceError,
  getGovernanceProposals,
  getGovernanceProposalsLeaderboard,
} from 'src/app/shared/governance/slice';
import { UrlParams, ROUTES } from 'src/constants';

import styles from 'src/styles/page.module.scss';
import { useMount, useUnmount } from 'react-use';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const NumberOfProposals: FC = () => {
  const [period, setPeriod] = useState('All');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const history = useHistory();
  const { contract } = useParams<UrlParams>();
  const error = useAppSelector(selectGovernanceError);
  const dispatch = useAppDispatch();
  const governanceProposalsLeaderboard = useAppSelector(
    selectGovernanceProposalsLeaderboard,
  );
  const governanceProposals = useAppSelector(selectGovernanceProposals);
  const governanceProposalsLeaderboardLoading = useAppSelector(
    selectActionLoading(getGovernanceProposalsLeaderboard.typePrefix),
  );
  const governanceProposalsLoading = useAppSelector(
    selectActionLoading(getGovernanceProposals.typePrefix),
  );

  useMount(() => {
    if (!governanceProposals) {
      dispatch(
        getGovernanceProposals({
          contract,
        }),
      ).catch((err) => console.error(err));
    }

    if (!governanceProposalsLeaderboard) {
      dispatch(
        getGovernanceProposalsLeaderboard({
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

  const governanceProposalsLeaderboardData = usePrepareLeaderboard({
    leaderboard: governanceProposalsLeaderboard?.metrics
      ? governanceProposalsLeaderboard.metrics
      : null,
  });

  const governanceProposalsData = useFilterMetrics(period, governanceProposals);
  const periods = usePeriods(governanceProposals?.metrics);

  const goToSingleDao = useCallback(
    (row) => {
      history.push(
        generatePath(ROUTES.governanceDao, { contract, dao: row.dao }),
      );
    },
    [contract, history],
  );

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          (isSuccess(governanceProposalsLoading) &&
            isSuccess(governanceProposalsLeaderboardLoading)) ||
          isFailed(governanceProposalsLoading) ||
          isFailed(governanceProposalsLeaderboardLoading)
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
      {governanceProposalsData?.metrics?.length === 0
        ? 'Not enough data'
        : null}
      <div className={styles.metricsContainer}>
        {activeTab === 'history-data' &&
        governanceProposalsData &&
        governanceProposalsData?.metrics?.length ? (
          <ChartLine
            periods={periods}
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
            onRowClick={goToSingleDao}
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Number of Proposals' },
              { value: 'Last month', position: 'right' },
            ]}
            type="line"
            dataRows={governanceProposalsLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
