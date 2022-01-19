import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { selectActionLoading } from 'src/store/loading';
import { isPending, isSuccess } from 'src/utils';
import { selectGovernanceDaoVoteRateById } from 'src/app/shared/governance/selectors';
import { getGovernanceDaoVoteRate } from 'src/app/shared/governance/slice';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const VoteRate: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const governanceVoteRate = useAppSelector(
    selectGovernanceDaoVoteRateById(dao),
  );

  const governanceVoteRateLoading = useAppSelector(
    selectActionLoading(getGovernanceDaoVoteRate.typePrefix),
  );

  useEffect(() => {
    if (!governanceVoteRate && !isPending(governanceVoteRateLoading)) {
      dispatch(
        getGovernanceDaoVoteRate({
          contract,
          dao,
        }),
      ).catch((error: unknown) => console.error(error));
    }
  }, [contract, dao, dispatch, governanceVoteRate, governanceVoteRateLoading]);

  const governanceVoteRateData = useFilterMetrics(period, governanceVoteRate);
  const periods = usePeriods(governanceVoteRate?.metrics);

  return (
    <>
      <LoadingContainer hide={isSuccess(governanceVoteRateLoading)} />
      <div className={styles.metricsContainer}>
        {governanceVoteRateData ? (
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
