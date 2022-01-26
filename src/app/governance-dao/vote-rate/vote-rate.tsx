import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, LoadingContainer } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { selectActionLoading } from 'src/app/shared';
import { isFailed, isSuccess } from 'src/utils';
import {
  selectGovernanceDaoVoteRateById,
  selectGovernanceError,
} from 'src/app/shared/governance/selectors';
import {
  clearGovernanceError,
  getGovernanceDaoVoteRate,
} from 'src/app/shared/governance/slice';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const VoteRate: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const error = useAppSelector(selectGovernanceError);
  const dispatch = useAppDispatch();
  const governanceVoteRate = useAppSelector(
    selectGovernanceDaoVoteRateById(dao),
  );

  const governanceVoteRateLoading = useAppSelector(
    selectActionLoading(getGovernanceDaoVoteRate.typePrefix),
  );

  useMount(() => {
    if (!governanceVoteRate) {
      dispatch(
        getGovernanceDaoVoteRate({
          contract,
          dao,
        }),
      ).catch((err) => console.error(err));
    }
  });

  useUnmount(() => {
    dispatch(clearGovernanceError());
  });

  const governanceVoteRateData = useFilterMetrics(period, governanceVoteRate);
  const periods = usePeriods(governanceVoteRate?.metrics);

  return (
    <>
      <LoadingContainer
        hide={
          isSuccess(governanceVoteRateLoading) ||
          isFailed(governanceVoteRateLoading)
        }
      />
      {error ? <p className={styles.error}>{error}</p> : null}
      {governanceVoteRateData?.metrics?.length === 0 ? 'Not enough data' : null}
      <div className={styles.metricsContainer}>
        {governanceVoteRateData && governanceVoteRateData?.metrics?.length ? (
          <ChartLine
            periods={periods}
            data={governanceVoteRateData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Vote through rate, %',
                color: '#E33F84',
                dataKey: 'count',
              },
            ]}
          />
        ) : null}
      </div>
    </>
  );
};
