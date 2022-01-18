import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useMount } from 'react-use';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectFlowDaoFundsById } from 'src/app/shared/flow/selectors';
import { getFlowDaoFunds } from 'src/app/shared/flow/slice';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isFailed } from 'src/utils';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const OutgoingFunds: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const funds = useAppSelector(selectFlowDaoFundsById(dao));
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
      ).catch((error: unknown) => {
        console.error(error);
      });
    }
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

      <div className={styles.metricsContainer}>
        {fundsData?.metrics?.length === 0 ? 'Not enough data' : null}
        {fundsData && fundsData?.metrics?.length ? (
          <ChartLine
            isCurrency
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
