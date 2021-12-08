import React, { FC, useEffect, useMemo, useState } from 'react';
import { ChartLine, Leaderboard, Tabs } from 'src/components';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../../store';
import {
  selectGeneralGroups,
  selectGeneralGroupsLeaderboard,
} from '../selectors';
import { getGeneralGroupsLeaderboard, getGeneralGroups } from '../slice';
import { getDateFromMow } from '../../../components/charts/helpers';

import styles from './groups.module.scss';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const Groups: FC = () => {
  const [period, setPeriod] = useState('1y');

  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectGeneralGroups);
  const groupsLeaderboard = useAppSelector(selectGeneralGroupsLeaderboard);

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    (async () => {
      try {
        await dispatch(
          getGeneralGroups({
            contract,
            from: String(getDateFromMow(period)),
          }),
        );
        await dispatch(
          getGeneralGroupsLeaderboard({
            contract,
          }),
        );
      } catch (error: unknown) {
        console.error(error);
      }
    })();
  }, [period, contract, dispatch]);

  const groupsLeaderboardData = useMemo(
    () =>
      groupsLeaderboard?.metrics.map((groupsLeaderboardItem, index) => ({
        id: index,
        titleCell: {
          label: groupsLeaderboardItem.dao,
          domain: groupsLeaderboardItem.dao,
        },
        line: {
          totalMetrics: groupsLeaderboardItem.activity,
          metrics: groupsLeaderboardItem.overview,
        },
      })),
    [groupsLeaderboard],
  );

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
        {activeTab === 'history-data' && groups ? (
          <ChartLine
            data={groups}
            period={period}
            setPeriod={setPeriod}
            lines={[{ name: 'Groups', color: '#E33F84', dataKey: 'count' }]}
          />
        ) : null}
        {activeTab === 'leaderboard' && groupsLeaderboardData ? (
          <Leaderboard
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Groups' },
              { value: 'Last 7 days', position: 'right' },
            ]}
            type="line"
            dataRows={groupsLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
