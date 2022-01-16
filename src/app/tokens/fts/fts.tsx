import React, { FC, useCallback, useEffect, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { useFilterMetrics, usePrepareLeaderboard, usePeriods } from 'src/hooks';
import { isPending, isSuccess, isNotAsked } from 'src/utils';
import { ROUTES } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import {
  selectTokensFts,
  selectTokensFtsLeaderboard,
} from 'src/app/shared/tokens/selectors';
import {
  getTokensFts,
  getTokensFtsLeaderboard,
} from 'src/app/shared/tokens/slice';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const Fts: FC = () => {
  const history = useHistory();
  const [period, setPeriod] = useState('All');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);

  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokensFts);
  const tokensLeaderboard = useAppSelector(selectTokensFtsLeaderboard);
  const getTokensFtsLoading = useAppSelector(
    selectActionLoading(getTokensFts.typePrefix),
  );
  const getTokensFtsLeaderboardLoading = useAppSelector(
    selectActionLoading(getTokensFtsLeaderboard.typePrefix),
  );

  useEffect(() => {
    if (isNotAsked(getTokensFtsLoading) && !isPending(getTokensFtsLoading)) {
      dispatch(
        getTokensFts({
          contract,
        }),
      ).catch((error: unknown) => console.error(error));
    }

    if (
      isNotAsked(getTokensFtsLeaderboardLoading) &&
      !isPending(getTokensFtsLeaderboardLoading)
    ) {
      dispatch(
        getTokensFtsLeaderboard({
          contract,
        }),
      ).catch((error: unknown) => console.error(error));
    }
  }, [dispatch, contract, getTokensFtsLoading, getTokensFtsLeaderboardLoading]);

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  const activityLeaderboardData = usePrepareLeaderboard({
    leaderboard: tokensLeaderboard?.metrics ? tokensLeaderboard.metrics : null,
  });

  const tokensData = useFilterMetrics(period, tokens);
  const periods = usePeriods(tokens?.metrics);

  const goToSingleDao = useCallback(
    (row) => {
      history.push(generatePath(ROUTES.tokensDao, { contract, dao: row.dao }));
    },
    [contract, history],
  );

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          isSuccess(getTokensFtsLoading) &&
          isSuccess(getTokensFtsLeaderboardLoading)
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
        {activeTab === 'history-data' && tokensData ? (
          <ChartLine
            periods={periods}
            data={tokensData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              { name: 'Number of FTs', color: '#E33F84', dataKey: 'count' },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' && activityLeaderboardData ? (
          <Leaderboard
            onRowClick={goToSingleDao}
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Number of FTs' },
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
