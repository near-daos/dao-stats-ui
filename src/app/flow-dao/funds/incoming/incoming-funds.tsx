import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectFlowDaoIncomingFundsById } from 'src/app/shared/flow/selectors';
import { getFlowDaoIncomingFunds } from 'src/app/shared/flow/slice';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending } from 'src/utils';

import styles from 'src/styles/page.module.scss';

export const IncomingFunds: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();
  const incomingFundsItems = useAppSelector(
    selectFlowDaoIncomingFundsById(dao),
  );
  const getFlowDaoIncomingFundsLoading = useAppSelector(
    selectActionLoading(getFlowDaoIncomingFunds.typePrefix),
  );

  useEffect(() => {
    if (!incomingFundsItems && !isPending(getFlowDaoIncomingFundsLoading)) {
      dispatch(
        getFlowDaoIncomingFunds({
          contract,
          dao,
        }),
      ).catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    }
  }, [
    contract,
    dao,
    dispatch,
    getFlowDaoIncomingFundsLoading,
    incomingFundsItems,
  ]);

  const activityData = useFilterMetrics(period, incomingFundsItems);
  const periods = usePeriods(incomingFundsItems?.metrics);

  return (
    <>
      <LoadingContainer hide={isSuccess(getFlowDaoIncomingFundsLoading)} />

      <div className={styles.metricsContainer}>
        {activityData && activityData?.metrics?.length ? (
          <ChartLine
            data={activityData}
            period={period}
            setPeriod={setPeriod}
            periods={periods}
            lines={[
              { name: 'Incoming funds', color: '#E33F84', dataKey: 'incoming' },
            ]}
          />
        ) : (
          'It doesn`t have enough data to show chart'
        )}
      </div>
    </>
  );
};
