import React, { FC, useEffect, useState } from 'react';
import { ChartLine, Tabs, Leaderboard } from 'src/components';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/store';
import { usePrepareLeaderboard } from 'src/hooks';

import {
  selectActivityProposals,
  selectActivityProposalsLeaderboard,
} from '../selectors';
import {
  getActivityProposals,
  getActivityProposalsLeaderboard,
} from '../slice';

import { getDateFromMow } from '../../../components/charts/helpers';

import styles from './number-of-proposals.module.scss';

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
  const activityProposalsLeaderboard = useAppSelector(
    selectActivityProposalsLeaderboard,
  );
  const activityProposals = useAppSelector(selectActivityProposals);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(
          getActivityProposals({
            contract,
            from: String(getDateFromMow(period)),
          }),
        );
        await dispatch(
          getActivityProposalsLeaderboard({
            contract,
          }),
        );
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, [period, contract, dispatch]);

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  const activityLeaderboardData = usePrepareLeaderboard({
    leaderboard: activityProposalsLeaderboard?.metrics
      ? activityProposalsLeaderboard.metrics
      : null,
  });

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
        {activeTab === 'history-data' && activityProposals ? (
          <ChartLine
            data={activityProposals}
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
        {activeTab === 'leaderboard' && activityLeaderboardData ? (
          <Leaderboard
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'DAOs activity' },
              { value: 'Last 7 days', position: 'right' },
            ]}
            type="line"
            dataRows={activityLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
