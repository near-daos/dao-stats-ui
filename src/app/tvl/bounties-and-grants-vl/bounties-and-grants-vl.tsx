import React, { FC, useCallback, useEffect, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { useFilterMetrics, usePrepareLeaderboard, usePeriods } from 'src/hooks';
import { isPending, isSuccess, isNotAsked } from 'src/utils';
import { ROUTES } from 'src/constants';
import { Params } from 'src/api';
import {
  getTvlBountiesAndGrantsVlLeaderboard,
  getTvlBountiesAndGrantsVl,
  selectTvlBountiesAndGrantsVl,
  selectTvlBountiesAndGrantsVlLeaderboard,
  getDao,
} from 'src/app/shared';

import styles from 'src/styles/page.module.scss';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const BountiesAndGrantsVl: FC = () => {
  const history = useHistory();
  const [period, setPeriod] = useState('All');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);

  const { contract } = useParams<Params>();
  const dispatch = useAppDispatch();
  const tvl = useAppSelector(selectTvlBountiesAndGrantsVl);
  const tvlLeaderboard = useAppSelector(
    selectTvlBountiesAndGrantsVlLeaderboard,
  );
  const getTvlLoading = useAppSelector(
    selectActionLoading(getTvlBountiesAndGrantsVl.typePrefix),
  );
  const getTvlLeaderboardLoading = useAppSelector(
    selectActionLoading(getTvlBountiesAndGrantsVlLeaderboard.typePrefix),
  );

  useEffect(() => {
    if (isNotAsked(getTvlLoading) && !isPending(getTvlLoading)) {
      dispatch(
        getTvlBountiesAndGrantsVl({
          contract,
        }),
        // eslint-disable-next-line no-console
      ).catch((error: unknown) => console.error(error));
    }

    if (
      isNotAsked(getTvlLeaderboardLoading) &&
      !isPending(getTvlLeaderboardLoading)
    ) {
      dispatch(
        getTvlBountiesAndGrantsVlLeaderboard({
          contract,
        }),
        // eslint-disable-next-line no-console
      ).catch((error: unknown) => console.error(error));
    }
  }, [dispatch, contract, getTvlLoading, getTvlLeaderboardLoading]);

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  const activityLeaderboardData = usePrepareLeaderboard({
    leaderboard: tvlLeaderboard?.metrics ? tvlLeaderboard.metrics : null,
  });

  const tvlData = useFilterMetrics(period, tvl);
  const periods = usePeriods(tvl?.metrics);

  const goToSingleDao = useCallback(
    (row) => {
      dispatch(getDao({ contract, dao: row.dao }))
        .then(() => {
          history.push(generatePath(ROUTES.tvlDao, { contract, dao: row.dao }));
        })
        .catch((err: unknown) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
    },
    [contract, history, dispatch],
  );

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={isSuccess(getTvlLoading) && isSuccess(getTvlLeaderboardLoading)}
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
        {activeTab === 'history-data' && tvlData ? (
          <ChartLine
            isCurrency
            periods={periods}
            data={tvlData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'VL in Bounties/Grants',
                color: '#E33F84',
                dataKey: 'count',
              },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' && activityLeaderboardData ? (
          <Leaderboard
            isCurrency
            onRowClick={goToSingleDao}
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'VL in Bounties/Grants' },
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
