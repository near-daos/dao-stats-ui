import React, { FC, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import merge from 'lodash/merge';

import {
  selectGovernanceProposalsTypes,
  selectGovernanceProposalsTypesLeaderboard,
} from '../selectors';
import {
  getGovernanceProposalsTypes,
  getGovernanceProposalsTypesLeaderboard,
} from '../slice';

import { usePrepareLeaderboard } from '../../../hooks';
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

export const ProposalsType: FC = () => {
  const [period, setPeriod] = useState('1y');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);

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
    (async () => {
      try {
        if (
          (!governanceProposalsTypes ||
            isNotAsked(governanceProposalsTypesLoading)) &&
          !isPending(governanceProposalsTypesLoading)
        ) {
          await dispatch(
            getGovernanceProposalsTypes({
              contract,
            }),
          );
        }

        if (
          (!governanceProposalsTypesLeaderboard ||
            isNotAsked(governanceProposalsTypesLeaderboardLoading)) &&
          !isPending(governanceProposalsTypesLeaderboardLoading)
        ) {
          await dispatch(
            getGovernanceProposalsTypesLeaderboard({
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
    governanceProposalsTypes,
    governanceProposalsTypesLoading,
    governanceProposalsTypesLeaderboard,
    governanceProposalsTypesLeaderboardLoading,
  ]);

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  const governanceProposalsTypesData = useMemo(() => {
    if (!governanceProposalsTypes?.metrics) {
      return null;
    }

    const result: any[] = [];

    Object.keys(governanceProposalsTypes.metrics).forEach((key) => {
      result.push(
        (governanceProposalsTypes.metrics as any)[key].map((value: any) => ({
          timestamp: value.timestamp,
          [key]: value.value,
        })),
      );
    });

    return { metrics: merge([], ...result) };
  }, [governanceProposalsTypes]);

  const governanceProposalsTypesLeaderboardData = usePrepareLeaderboard({
    type: 'stacked',
    leaderboard: governanceProposalsTypesLeaderboard?.leaderboard
      ? governanceProposalsTypesLeaderboard.leaderboard
      : null,
  });

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
        {activeTab === 'history-data' && governanceProposalsTypesData ? (
          <ChartLine
            data={governanceProposalsTypesData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Payout',
                color: '#E33F84',
                dataKey: 'payout',
              },
              {
                name: 'Policy change',
                color: '#5D75E9',
                dataKey: 'policyChange',
              },
              {
                name: 'Council member',
                color: '#8F40DD',
                dataKey: 'councilMember',
              },
              {
                name: 'Expired',
                color: '#81CEEE',
                dataKey: 'expired',
              },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' &&
        governanceProposalsTypesLeaderboardData ? (
          <Leaderboard
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
