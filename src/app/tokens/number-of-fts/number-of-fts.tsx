import React, { FC, useState } from 'react';
import { ChartLine, Leaderboard, Tabs } from 'src/components';
import { getRechartsData } from 'src/components/charts/rechartsData';
import { leaderboardData } from 'src/components/leaderboard/leaderboardData';
import styles from './number-of-fts.module.scss';

const rechartsData = getRechartsData();

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const TokensNumberOfFTs: FC = () => {
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

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
        {activeTab === 'history-data' && <ChartLine data={rechartsData} />}
        {activeTab === 'leaderboard' && <Leaderboard data={leaderboardData} />}
      </div>
    </div>
  );
};
