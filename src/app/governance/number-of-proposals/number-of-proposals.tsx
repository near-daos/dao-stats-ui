import React, { FC, useCallback, useEffect, useState } from 'react';
import { ChartLine, Tabs, Leaderboard, LoadingContainer } from 'src/components';
import { generatePath, useHistory, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useFilterMetrics, usePeriods, usePrepareLeaderboard } from 'src/hooks';
import { isNotAsked, isPending, isSuccess } from 'src/utils';
import { selectActionLoading } from 'src/store/loading';
import {
  selectGovernanceProposals,
  selectGovernanceProposalsLeaderboard,
} from 'src/app/shared/governance/selectors';
import {
  getGovernanceProposals,
  getGovernanceProposalsLeaderboard,
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

export const NumberOfProposals: FC = () => {
  const [period, setPeriod] = useState('All');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const history = useHistory();
  const { contract } = useParams<{ contract: string }>();
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

  useEffect(() => {
    if (
      isNotAsked(governanceProposalsLoading) &&
      !isPending(governanceProposalsLoading)
    ) {
      dispatch(
        getGovernanceProposals({
          contract,
        }),
        // eslint-disable-next-line no-console
      ).catch((error: unknown) => console.error(error));
    }

    if (
      isNotAsked(governanceProposalsLeaderboardLoading) &&
      !isPending(governanceProposalsLeaderboardLoading)
    ) {
      dispatch(
        getGovernanceProposalsLeaderboard({
          contract,
        }),
        // eslint-disable-next-line no-console
      ).catch((error: unknown) => console.error(error));
    }
  }, [
    contract,
    dispatch,
    governanceProposalsLoading,
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
          isSuccess(governanceProposalsLoading) &&
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
      <div className={styles.metricsContainer}>
        {activeTab === 'history-data' && governanceProposalsData ? (
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
