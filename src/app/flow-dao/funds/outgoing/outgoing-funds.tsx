import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  selectFlowDaoFundsById,
  selectFlowError,
} from 'src/app/shared/flow/selectors';
import { clearFlowError, getFlowDaoFunds } from 'src/app/shared/flow/slice';
import { selectActionLoading } from 'src/app/shared';
import { isSuccess, isFailed } from 'src/utils';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const OutgoingFunds: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const funds = useAppSelector(selectFlowDaoFundsById(dao));
  const error = useAppSelector(selectFlowError);
  const getFlowDaoFundsLoading = useAppSelector(
    selectActionLoading(getFlowDaoFunds.typePrefix),
  );

  useMount(() => {
    if (!funds) {
      dispatch(
        getFlowDaoFunds({
          contract,
          dao,
        }),
      ).catch((err: unknown) => console.error(err));
    }
  });

  useUnmount(() => {
    dispatch(clearFlowError());
  });

  const fundsData = useFilterMetrics(period, funds);
  const periods = usePeriods(funds?.metrics);

  return (
    <>
      <LoadingContainer
        hide={
          isSuccess(getFlowDaoFundsLoading) || isFailed(getFlowDaoFundsLoading)
        }
      />
      {fundsData?.metrics?.length === 0 ? 'Not enough data' : null}
      {error ? <p className={styles.error}>{error}</p> : null}
      <div className={styles.metricsContainer}>
        {fundsData && fundsData?.metrics?.length ? (
          <ChartLine
            isNear
            data={fundsData}
            period={period}
            setPeriod={setPeriod}
            periods={periods}
            lines={[
              { name: 'Total Out', color: '#E33F84', dataKey: 'outgoing' },
            ]}
          />
        ) : null}
      </div>
    </>
  );
};
