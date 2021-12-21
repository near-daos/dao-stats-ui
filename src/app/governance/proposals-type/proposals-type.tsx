import React, { FC, useCallback, useEffect, useState } from 'react';
import { generatePath, useParams, useHistory } from 'react-router';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  useFilterMetrics,
  useGovernanceChartData,
  usePrepareLeaderboard,
} from 'src/hooks';
import { isNotAsked, isPending, isSuccess } from 'src/utils';
import { selectActionLoading } from 'src/store/loading';
import {
  selectGovernanceProposalsTypes,
  selectGovernanceProposalsTypesLeaderboard,
} from 'src/app/shared/governance/selectors';
import {
  getGovernanceProposalsTypes,
  getGovernanceProposalsTypesLeaderboard,
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

export const ProposalsType: FC = () => {
  const [period, setPeriod] = useState('1y');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const history = useHistory();
  const { contract } = useParams<{ contract: string }>();
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

  useEffect(() => {
    if (
      isNotAsked(governanceProposalsTypesLoading) &&
      !isPending(governanceProposalsTypesLoading)
    ) {
      dispatch(
        getGovernanceProposalsTypes({
          contract,
        }),
        // eslint-disable-next-line no-console
      ).catch((error: unknown) => console.error(error));
    }

    if (
      isNotAsked(governanceProposalsTypesLeaderboardLoading) &&
      !isPending(governanceProposalsTypesLeaderboardLoading)
    ) {
      dispatch(
        getGovernanceProposalsTypesLeaderboard({
          contract,
        }),
        // eslint-disable-next-line no-console
      ).catch((error: unknown) => console.error(error));
    }
  }, [
    period,
    contract,
    dispatch,
    governanceProposalsTypesLoading,
    governanceProposalsTypesLeaderboardLoading,
  ]);

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
          isSuccess(governanceProposalsTypesLoading) &&
          isSuccess(governanceProposalsTypesLeaderboardLoading)
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
        {activeTab === 'history-data' &&
        governanceProposalsTypesFilteredData ? (
          <ChartLine
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
