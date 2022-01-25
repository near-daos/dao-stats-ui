import React, { FC, useCallback, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, Leaderboard, LoadingContainer, Tabs } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectActionLoading } from 'src/app/shared';
import { useFilterMetrics, usePrepareLeaderboard, usePeriods } from 'src/hooks';
import { isSuccess, isFailed } from 'src/utils';
import { ROUTES, UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import {
  selectTokensError,
  selectTokensNfts,
  selectTokensNftsLeaderboard,
} from 'src/app/shared/tokens/selectors';
import {
  clearTokensError,
  getTokensNfts,
  getTokensNftsLeaderboard,
} from 'src/app/shared/tokens/slice';

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const Nfts: FC = () => {
  const history = useHistory();
  const [period, setPeriod] = useState('All');
  const [activeTab, setActiveTab] = useState(tabOptions[0].value);
  const error = useAppSelector(selectTokensError);
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokensNfts);
  const tokensLeaderboard = useAppSelector(selectTokensNftsLeaderboard);
  const getTokensNftsLoading = useAppSelector(
    selectActionLoading(getTokensNfts.typePrefix),
  );
  const getTokensNftsLeaderboardLoading = useAppSelector(
    selectActionLoading(getTokensNftsLeaderboard.typePrefix),
  );

  useMount(() => {
    if (!tokens) {
      dispatch(
        getTokensNfts({
          contract,
        }),
      ).catch((err) => console.error(err));
    }

    if (!tokensLeaderboard) {
      dispatch(
        getTokensNftsLeaderboard({
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
        generatePath(ROUTES.tokensNftsDao, { contract, dao: row.dao }),
      );
    },
    [contract, history],
  );

  return (
    <div className={styles.detailsContainer}>
      <LoadingContainer
        hide={
          (isSuccess(getTokensNftsLoading) &&
            isSuccess(getTokensNftsLeaderboardLoading)) ||
          isFailed(getTokensNftsLoading) ||
          isFailed(getTokensNftsLeaderboardLoading)
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
            periods={periods}
            data={tokensData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              { name: 'Number of NFTs', color: '#E33F84', dataKey: 'count' },
            ]}
          />
        ) : null}
        {activeTab === 'leaderboard' && activityLeaderboardData ? (
          <Leaderboard
            onRowClick={goToSingleDao}
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Number of NFTs' },
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
