import React, { FC, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';

import { ChartLine, Tabs, Leaderboard } from 'src/components';
import { getDateFromMow } from 'src/components/charts/helpers';

import { getUsersHistory, getUsersLeaderboard } from '../slice';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectUsersHistory, selectUsersLeaderboard } from '../selectors';

import styles from './number-users.module.scss';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const NumberUsers: FC = () => {
  const [period, setPeriod] = useState('1y');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);

  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersHistory);
  const usersLeaderboard = useAppSelector(selectUsersLeaderboard);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(
          getUsersHistory({
            contract,
            from: String(getDateFromMow(period)),
          }),
        );
        await dispatch(
          getUsersLeaderboard({
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

  const usersLeaderboardData = useMemo(
    () =>
      usersLeaderboard?.metrics.map((usersLeaderboardItem, index) => ({
        id: index,
        titleCell: {
          label: usersLeaderboardItem.dao,
          domain: usersLeaderboardItem.dao,
        },
        line: {
          totalMetrics: usersLeaderboardItem.activity,
          metrics: usersLeaderboardItem.overview,
        },
      })),
    [usersLeaderboard],
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
        {activeTab === 'history-data' && users ? (
          <ChartLine
            data={users}
            period={period}
            setPeriod={setPeriod}
            lines={[{ name: 'Users', color: '#E33F84', dataKey: 'count' }]}
          />
        ) : null}
        {activeTab === 'leaderboard' && usersLeaderboardData ? (
          <Leaderboard
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Users' },
              { value: 'Last 7 days', position: 'right' },
            ]}
            type="line"
            dataRows={usersLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
