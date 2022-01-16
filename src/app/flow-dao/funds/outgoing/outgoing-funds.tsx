import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectFlowDaoFundsById } from 'src/app/shared/flow/selectors';
import { getFlowDaoFunds } from 'src/app/shared/flow/slice';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isFailed } from 'src/utils';

import styles from 'src/styles/page.module.scss';

export const OutgoingFunds: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();
  const funds = useAppSelector(selectFlowDaoFundsById(dao));
  const getFlowDaoFundsLoading = useAppSelector(
    selectActionLoading(getFlowDaoFunds.typePrefix),
  );

  useEffect(() => {
    dispatch(
      getFlowDaoFunds({
        contract,
        dao,
      }),
    ).catch((error: unknown) => {
      console.error(error);
    });
  }, [contract, dao, dispatch]);

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
        {fundsData?.metrics?.length === 0
          ? 'It doesn`t have enough data to show chart'
          : null}
        {fundsData ? (
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
