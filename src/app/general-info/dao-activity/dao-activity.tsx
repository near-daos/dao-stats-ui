import React, { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getDateFromMow } from 'src/components/charts/helpers';

import { selectGeneralActivity } from '../selectors';
import { getGeneralActivity } from '../slice';

import styles from './dao-activity.module.scss';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const DaoActivity: FC = () => {
  const [period, setPeriod] = useState('1y');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);

  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const activityData = useAppSelector(selectGeneralActivity);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(
          getGeneralActivity({
            contract,
            from: String(getDateFromMow(period)),
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
        {activeTab === 'history-data' && activityData ? (
          <ChartLine
            data={activityData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              { name: 'DAOs activity', color: '#E33F84', dataKey: 'count' },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' && 'leaderboard'}
      </div>
    </div>
  );
};
