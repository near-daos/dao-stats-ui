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

import { useFilterMetrics, usePrepareLeaderboard } from '../../../hooks';
import { isNotAsked, isPending, isSuccess } from '../../../utils';
import { selectActionLoading } from '../../../store/loading';

import styles from '../governance.module.scss';
import { MetricItem, Metrics } from '../../../api';

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
    if (
      (!governanceProposalsTypes ||
        isNotAsked(governanceProposalsTypesLoading)) &&
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
      (!governanceProposalsTypesLeaderboard ||
        isNotAsked(governanceProposalsTypesLeaderboardLoading)) &&
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

    const findMaxData = (metrics: any) => {
      let max = 0;
      let maxData: MetricItem[] = [];
      const result = { metrics: {} };

      Object.values(metrics).forEach((value: any) => {
        if (max <= value.length) {
          maxData = value.map((valueItem: MetricItem) => ({
            timestamp: valueItem.timestamp,
            count: 0,
          }));
        }

        max = Math.max(max, value.length);
      });

      Object.keys(metrics).forEach((key: string) => {
        (result.metrics as any)[key] = maxData.map((maxDataItem) => {
          const finded = (metrics as any)[key].find(
            (item: MetricItem) => item.timestamp === maxDataItem.timestamp,
          );

          if (finded) {
            return finded;
          }

          return maxDataItem;
        });
      });

      return result;
    };

    const updatedMetrics = findMaxData(governanceProposalsTypes.metrics);

    const result: any[] = [];

    Object.keys(updatedMetrics.metrics).forEach((key) => {
      result.push(
        (updatedMetrics.metrics as any)[key].map((value: any) => ({
          timestamp: value.timestamp,
          [key]: value.count,
        })),
      );
    });

    return { metrics: merge([], ...result) };
  }, [governanceProposalsTypes]);

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
