import React, { FC, useCallback, useEffect, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { useFilterMetrics, usePrepareLeaderboard, usePeriods } from 'src/hooks';
import { isPending, isSuccess, isNotAsked } from 'src/utils';
import { CURRENCY_KEY, ROUTES } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import {
  selectTokensFtsVl,
  selectTokensFtsVlLeaderboard,
} from 'src/app/shared/tokens/selectors';
import {
  getTokensFtsVl,
  getTokensFtsVlLeaderboard,
} from 'src/app/shared/tokens/slice';
import { useLocalStorage } from 'react-use';
import { Currency } from '../../../api';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const FtsVl: FC = () => {
  const [currency] = useLocalStorage(CURRENCY_KEY);
  const history = useHistory();
  const [period, setPeriod] = useState('All');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);

  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokensFtsVl);
  const tokensLeaderboard = useAppSelector(selectTokensFtsVlLeaderboard);
  const getTokensFtsVlLoading = useAppSelector(
    selectActionLoading(getTokensFtsVl.typePrefix),
  );
  const getTokensFtsVlLeaderboardLoading = useAppSelector(
    selectActionLoading(getTokensFtsVlLeaderboard.typePrefix),
  );

  useEffect(() => {
    if (
      isNotAsked(getTokensFtsVlLoading) &&
      !isPending(getTokensFtsVlLoading)
    ) {
      dispatch(
        getTokensFtsVl({
          contract,
        }),
        // eslint-disable-next-line no-console
      ).catch((error: unknown) => console.error(error));
    }

    if (
      isNotAsked(getTokensFtsVlLeaderboardLoading) &&
      !isPending(getTokensFtsVlLeaderboardLoading)
    ) {
      dispatch(
        getTokensFtsVlLeaderboard({
          contract,
        }),
        // eslint-disable-next-line no-console
      ).catch((error: unknown) => console.error(error));
    }
  }, [
    dispatch,
    contract,
    getTokensFtsVlLoading,
    getTokensFtsVlLeaderboardLoading,
  ]);

  const handleOnChange = (value: string) => {
    setActiveTab(value);
  };

  const activityLeaderboardData = usePrepareLeaderboard({
    leaderboard: tokensLeaderboard?.metrics ? tokensLeaderboard.metrics : null,
  });

  const tokensData = useFilterMetrics(period, {
    metrics:
      tokens?.metrics.map((metricItem) => ({
        ...metricItem,
        count: (currency as Currency)?.near?.usd,
      })) || [],
  });
  const periods = usePeriods(tokens?.metrics);

  const goToSingleDao = useCallback(
    (row) => {
      history.push(
        generatePath(ROUTES.tokensFtsVlDao, { contract, dao: row.dao }),
      );
    },
    [contract, history],
  );

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          isSuccess(getTokensFtsVlLoading) &&
          isSuccess(getTokensFtsVlLeaderboardLoading)
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
            lines={[{ name: 'VL of Fts', color: '#E33F84', dataKey: 'count' }]}
          />
        ) : null}
        {activeTab === 'leaderboard' && activityLeaderboardData ? (
          <Leaderboard
            onRowClick={goToSingleDao}
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'VL of Fts' },
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
