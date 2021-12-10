import React, { FC, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { ChartLine, Leaderboard, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { usePrepareLeaderboard } from 'src/hooks';
import merge from 'lodash/merge';

import {
  selectActivityProposalsTypes,
  selectActivityProposalsTypesLeaderboard,
} from '../selectors';
import {
  getActivityProposalsTypes,
  getActivityProposalsTypesLeaderboard,
} from '../slice';
import { getDateFromMow } from '../../../components/charts/helpers';

import styles from './proposals-type.module.scss';
import { Proposals } from '../../../api';

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
  const activityProposalsTypes = useAppSelector(selectActivityProposalsTypes);
  const activityProposalsTypesLeaderboard = useAppSelector(
    selectActivityProposalsTypesLeaderboard,
  );

  useEffect(() => {
    (async () => {
      try {
        await dispatch(
          getActivityProposalsTypes({
            contract,
            from: String(getDateFromMow(period)),
          }),
        );
        await dispatch(
          getActivityProposalsTypesLeaderboard({
            contract,
          }),
        );
      } catch (error: unknown) {
        console.error(error);
      }
    })();
  }, [period, contract, dispatch]);

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  const activityProposalsTypesData = useMemo(() => {
    if (!activityProposalsTypes?.metrics) {
      return null;
    }

    const result: any[] = [];

    Object.keys(activityProposalsTypes.metrics).forEach((key) => {
      result.push(
        (activityProposalsTypes.metrics as any)[key].map((value: any) => ({
          timestamp: value.timestamp,
          [key]: value.value,
        })),
      );
    });

    return { metrics: merge([], ...result) };
  }, [activityProposalsTypes]);

  const activityProposalsTypesLeaderboardData = useMemo(() => {
    if (!activityProposalsTypesLeaderboard?.leaderboard) {
      return null;
    }

    function percentage(partialValue: number, totalValue: number): number {
      return parseInt(((100 * partialValue) / totalValue).toFixed(0), 10);
    }

    function prepareProposalsForChart(proposals: Proposals): Proposals {
      const totalValue = Object.values(proposals).reduce((a, b) => a + b);

      return {
        payout: percentage(proposals.payout, totalValue),
        councilMember: percentage(proposals.councilMember, totalValue),
        policyChange: percentage(proposals.policyChange, totalValue),
        expired: percentage(proposals.expired, totalValue),
      };
    }

    return activityProposalsTypesLeaderboard.leaderboard.map(
      (leaderBoardItem, index) => ({
        id: index,
        titleCell: {
          label: leaderBoardItem.dao,
          domain: leaderBoardItem.dao,
        },
        proposals: prepareProposalsForChart(leaderBoardItem.proposalsByType),
      }),
    );
  }, [activityProposalsTypesLeaderboard]);

  return (
    <div className={styles.mainContent}>
      <div className={styles.tabWrapper}>
        <Tabs
          variant="small"
          options={tabOptions}
          className={styles.tabs}
          onChange={handleOnChange}
        />
      </div>
      <div className={styles.chart}>
        {activeTab === 'history-data' && activityProposalsTypesData ? (
          <ChartLine
            data={activityProposalsTypesData}
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
        activityProposalsTypesLeaderboardData ? (
          <Leaderboard
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Proposals by type' },
            ]}
            type="stacked"
            dataRows={activityProposalsTypesLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
