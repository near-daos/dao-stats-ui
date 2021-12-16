import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useFilterMetrics, usePrepareLeaderboard } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  selectGeneralGroups,
  selectGeneralGroupsLeaderboard,
} from 'src/app/shared/general/selectors';
import {
  getGeneralGroupsLeaderboard,
  getGeneralGroups,
} from 'src/app/shared/general/slice';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending, isNotAsked } from 'src/utils';

import styles from 'src/styles/page.module.scss';

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
  const getGeneralGroupsLoading = useAppSelector(
    selectActionLoading(getGeneralGroups.typePrefix),
  );
  const getGeneralGroupsLeaderboardLoading = useAppSelector(
    selectActionLoading(getGeneralGroupsLeaderboard.typePrefix),
  );

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    (async () => {
      try {
        if (
          (!groups || isNotAsked(getGeneralGroupsLoading)) &&
          !isPending(getGeneralGroupsLoading)
        ) {
          await dispatch(
            getGeneralGroups({
              contract,
            }),
          );
        }

        if (
          (!groupsLeaderboard || isNotAsked(getGeneralGroupsLoading)) &&
          !isPending(getGeneralGroupsLeaderboardLoading)
        ) {
          await dispatch(
            getGeneralGroupsLeaderboard({
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
    groups,
    groupsLeaderboard,
    period,
    contract,
    dispatch,
    getGeneralGroupsLoading,
    getGeneralGroupsLeaderboardLoading,
  ]);

  const groupsLeaderboardData = usePrepareLeaderboard({
    leaderboard: groupsLeaderboard?.metrics ? groupsLeaderboard.metrics : null,
  });

  const groupsData = useFilterMetrics(period, groups);

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          isSuccess(getGeneralGroupsLoading) &&
          isSuccess(getGeneralGroupsLeaderboardLoading)
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
        {activeTab === 'history-data' && groupsData ? (
          <ChartLine
            data={groupsData}
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
