import React, { FC, useCallback, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/store/loading';
import { useFilterMetrics, usePrepareLeaderboard, usePeriods } from 'src/hooks';
import { isSuccess, isFailed } from 'src/utils';
import { ROUTES, UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import {
  selectTokensError,
  selectTokensFtsVl,
  selectTokensFtsVlLeaderboard,
} from 'src/app/shared/tokens/selectors';
import {
  clearTokensError,
  getTokensFtsVl,
  getTokensFtsVlLeaderboard,
} from 'src/app/shared/tokens/slice';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const FtsVl: FC = () => {
  const history = useHistory();
  const [period, setPeriod] = useState('All');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const error = useAppSelector(selectTokensError);
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokensFtsVl);
  const tokensLeaderboard = useAppSelector(selectTokensFtsVlLeaderboard);
  const getTokensFtsVlLoading = useAppSelector(
    selectActionLoading(getTokensFtsVl.typePrefix),
  );
  const getTokensFtsVlLeaderboardLoading = useAppSelector(
    selectActionLoading(getTokensFtsVlLeaderboard.typePrefix),
  );

  useMount(() => {
    if (!tokens) {
      dispatch(
        getTokensFtsVl({
          contract,
        }),
      ).catch((err) => console.error(err));
    }

    if (!tokensLeaderboard) {
      dispatch(
        getTokensFtsVlLeaderboard({
          contract,
        }),
      ).catch((err) => console.error(err));
    }
  });

  useUnmount(() => {
    dispatch(clearTokensError());
  });

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
          (isSuccess(getTokensFtsVlLoading) &&
            isSuccess(getTokensFtsVlLeaderboardLoading)) ||
          isFailed(getTokensFtsVlLoading) ||
          isFailed(getTokensFtsVlLeaderboardLoading)
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
      {error ? <p className={styles.error}>{error}</p> : null}
      {tokensData?.metrics?.length === 0 ? 'Not enough data' : null}
      <div className={styles.metricsContainer}>
        {activeTab === 'history-data' &&
        tokensData &&
        tokensData?.metrics?.length ? (
          <ChartLine
            isCurrency
            periods={periods}
            data={tokensData}
            period={period}
            setPeriod={setPeriod}
            lines={[{ name: 'VL of Fts', color: '#E33F84', dataKey: 'count' }]}
          />
        ) : null}
        {activeTab === 'leaderboard' && activityLeaderboardData ? (
          <Leaderboard
            isCurrency
            onRowClick={goToSingleDao}
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'VL of Fts' },
              { value: 'Last Month', position: 'right' },
            ]}
            type="line"
            dataRows={activityLeaderboardData}
          />
        ) : null}
      </div>
    </div>
  );
};
