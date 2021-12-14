import React, { FC, useState } from 'react';
import { Tabs } from 'src/components';

import styles from './tvl-dao.module.scss';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const TVLDao: FC = () => {
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
        {activeTab === 'history-data' && 'chart'}
        {activeTab === 'leaderboard' && 'leaderboard'}
      </div>
    </div>
  );
};
