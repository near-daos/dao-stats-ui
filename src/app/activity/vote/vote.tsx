import React, { FC, useEffect, useState } from 'react';
import { ChartLine, Leaderboard, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useFilterMetrics, usePrepareLeaderboard } from 'src/hooks';
import { useParams } from 'react-router';

import {
  selectActivityRate,
  selectActivityRateLeaderboard,
} from '../selectors';
import { getActivityRate, getActivityRateLeaderboard } from '../slice';
import { getDateFromMow } from '../../../components/charts/helpers';

import styles from './vote.module.scss';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const Vote: FC = () => {
  const [period, setPeriod] = useState('1y');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);

  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const activityRateLeaderboard = useAppSelector(selectActivityRateLeaderboard);
  const activityRate = useAppSelector(selectActivityRate);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(
          getActivityRate({
            contract,
            from: String(getDateFromMow(period)),
          }),
        );
        await dispatch(
          getActivityRateLeaderboard({
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

  const activityRateData = useFilterMetrics(period, activityRate);
  const activityRateLeaderboardData = usePrepareLeaderboard({
    leaderboard: activityRateLeaderboard,
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
        {activeTab === 'history-data' && activityRateData ? (
          <ChartLine
            data={activityRateData}
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
        {activeTab === 'leaderboard' && activityRateLeaderboardData ? (
          <Leaderboard
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Vote through rate' },
              { value: 'Last 7 days', position: 'right' },
            ]}
            type="line"
            dataRows={activityRateLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
