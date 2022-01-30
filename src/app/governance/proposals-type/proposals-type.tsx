import React, { FC, useCallback, useState } from 'react';
import { generatePath, useParams, useHistory } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  useFilterMetrics,
  useGovernanceChartData,
  usePeriods,
  usePrepareLeaderboard,
} from 'src/hooks';
import { isFailed, isSuccess } from 'src/utils';
import { selectActionLoading } from 'src/app/shared';
import {
  selectGovernanceError,
  selectGovernanceProposalsTypes,
  selectGovernanceProposalsTypesLeaderboard,
} from 'src/app/shared/governance/selectors';
import {
  clearGovernanceError,
  getGovernanceProposalsTypes,
  getGovernanceProposalsTypesLeaderboard,
} from 'src/app/shared/governance/slice';
import { ROUTES, UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const ProposalsType: FC = () => {
  const [period, setPeriod] = useState('All');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const history = useHistory();
  const error = useAppSelector(selectGovernanceError);
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const governanceProposalsTypes = useAppSelector(
    selectGovernanceProposalsTypes,
  );
  const governanceProposalsTypesLeaderboard = useAppSelector(
    selectGovernanceProposalsTypesLeaderboard,
  );

  const governanceProposalsTypesLeaderboardLoading = useAppSelector(
    selectActionLoading(getGovernanceProposalsTypesLeaderboard.typePrefix),
  );
  const governanceProposalsTypesLoading = useAppSelector(
    selectActionLoading(getGovernanceProposalsTypes.typePrefix),
  );

  useMount(() => {
    if (!governanceProposalsTypes) {
      dispatch(
        getGovernanceProposalsTypes({
          contract,
        }),
      ).catch((err) => console.error(err));
    }

    if (!governanceProposalsTypesLeaderboard) {
      dispatch(
        getGovernanceProposalsTypesLeaderboard({
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

  const governanceProposalsTypesData = useGovernanceChartData(
    governanceProposalsTypes,
  );

  const governanceProposalsTypesFilteredData = useFilterMetrics(
    period,
    governanceProposalsTypesData,
  );

  const periods = usePeriods(governanceProposalsTypesData?.metrics);

  const governanceProposalsTypesLeaderboardData = usePrepareLeaderboard({
    type: 'stacked',
    leaderboard: governanceProposalsTypesLeaderboard?.leaderboard
      ? governanceProposalsTypesLeaderboard.leaderboard
      : null,
  });

  const goToSingleDao = useCallback(
    (row) => {
      history.push(
        generatePath(ROUTES.governanceProposalTypeDao, {
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
          (isSuccess(governanceProposalsTypesLoading) &&
            isSuccess(governanceProposalsTypesLeaderboardLoading)) ||
          isFailed(governanceProposalsTypesLoading) ||
          isFailed(governanceProposalsTypesLeaderboardLoading)
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
      {governanceProposalsTypesFilteredData?.metrics?.length === 0
        ? 'Not enough data'
        : null}
      <div className={styles.metricsContainer}>
        {activeTab === 'history-data' &&
        governanceProposalsTypesFilteredData &&
        governanceProposalsTypesFilteredData?.metrics?.length ? (
          <ChartLine
            periods={periods}
            data={governanceProposalsTypesFilteredData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Governance',
                color: '#E33F84',
                dataKey: 'governance',
              },
              {
                name: 'Financial',
                color: '#8F40DD',
                dataKey: 'financial',
              },
              {
                name: 'Bounties',
                color: '#5D75E9',
                dataKey: 'bounties',
              },
              {
                name: 'Members',
                color: '#81CEEE',
                dataKey: 'members',
              },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' &&
        governanceProposalsTypesLeaderboardData ? (
          <Leaderboard
            onRowClick={goToSingleDao}
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Proposals by type' },
            ]}
            type="stacked"
            dataRows={governanceProposalsTypesLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
