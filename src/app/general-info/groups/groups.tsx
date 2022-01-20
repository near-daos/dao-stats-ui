import React, { FC, useCallback, useState } from 'react';
import { useParams, generatePath, useHistory } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useFilterMetrics, usePeriods, usePrepareLeaderboard } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  selectGeneralError,
  selectGeneralGroups,
  selectGeneralGroupsLeaderboard,
} from 'src/app/shared/general/selectors';
import {
  getGeneralGroupsLeaderboard,
  getGeneralGroups,
  clearGeneralError,
} from 'src/app/shared/general/slice';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isFailed } from 'src/utils';

import styles from 'src/styles/page.module.scss';
import { ROUTES, UrlParams } from 'src/constants';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const Groups: FC = () => {
  const [period, setPeriod] = useState('All');
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectGeneralError);
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

  useMount(() => {
    if (!groups) {
      dispatch(
        getGeneralGroups({
          contract,
        }),
      ).catch((err: unknown) => console.error(err));
    }

    if (!groupsLeaderboard) {
      dispatch(
        getGeneralGroupsLeaderboard({
          contract,
        }),
      ).catch((err: unknown) => console.error(err));
    }
  });

  useUnmount(() => {
    dispatch(clearGeneralError());
  });

  const groupsLeaderboardData = usePrepareLeaderboard({
    leaderboard: groupsLeaderboard?.metrics ? groupsLeaderboard.metrics : null,
  });

  const groupsData = useFilterMetrics(period, groups);
  const periods = usePeriods(groups?.metrics);

  const goToSingleDao = useCallback(
    (row) => {
      history.push(
        generatePath(ROUTES.generalInfoDaoGroups, { contract, dao: row.dao }),
      );
    },
    [contract, history],
  );

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          (isSuccess(getGeneralGroupsLoading) &&
            isSuccess(getGeneralGroupsLeaderboardLoading)) ||
          isFailed(getGeneralGroupsLoading) ||
          isFailed(getGeneralGroupsLeaderboardLoading)
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
      {groupsData?.metrics?.length === 0 ? 'Not enough data' : null}
      {error ? <p className={styles.error}>{error}</p> : null}
      <div className={styles.metricsContainer}>
        {activeTab === 'history-data' &&
        groupsData &&
        groupsData.metrics.length ? (
          <ChartLine
            periods={periods}
            data={groupsData}
            period={period}
            setPeriod={setPeriod}
            lines={[{ name: 'Groups', color: '#E33F84', dataKey: 'count' }]}
          />
        ) : null}
        {activeTab === 'leaderboard' && groupsLeaderboardData ? (
          <Leaderboard
            onRowClick={goToSingleDao}
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Groups' },
              { value: 'Last Month', position: 'right' },
            ]}
            type="line"
            dataRows={groupsLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
