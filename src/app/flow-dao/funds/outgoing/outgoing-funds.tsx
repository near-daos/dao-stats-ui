import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectFlowDaoOutgoingFundsById } from 'src/app/shared/flow/selectors';
import { getFlowDaoOutgoingFunds } from 'src/app/shared/flow/slice';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending } from 'src/utils';

import styles from 'src/styles/page.module.scss';

export const OutgoingFunds: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();
  const OutgoingFundsItems = useAppSelector(
    selectFlowDaoOutgoingFundsById(dao),
  );
  const getFlowDaoOutgoingFundsLoading = useAppSelector(
    selectActionLoading(getFlowDaoOutgoingFunds.typePrefix),
  );

  useEffect(() => {
    if (!OutgoingFundsItems && !isPending(getFlowDaoOutgoingFundsLoading)) {
      dispatch(
        getFlowDaoOutgoingFunds({
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
    getFlowDaoOutgoingFundsLoading,
    OutgoingFundsItems,
  ]);

  const activityData = useFilterMetrics(period, OutgoingFundsItems);
  const periods = usePeriods(OutgoingFundsItems?.metrics);

  return (
    <>
      <LoadingContainer hide={isSuccess(getFlowDaoOutgoingFundsLoading)} />

      <div className={styles.metricsContainer}>
        {activityData && activityData?.metrics?.length ? (
          <ChartLine
            data={activityData}
            period={period}
            setPeriod={setPeriod}
            periods={periods}
            lines={[
              { name: 'Outgoing Funds', color: '#E33F84', dataKey: 'outgoing' },
            ]}
          />
        ) : (
          'It doesn`t have enough data to show chart'
        )}
      </div>
    </>
  );
};
