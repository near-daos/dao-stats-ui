import React, { FC, useState } from 'react';
import { useMount } from 'react-use';
import { ChartLine, LoadingContainer } from 'src/components';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { isFailed, isSuccess } from 'src/utils';
import { selectActionLoading } from 'src/store/loading';
import { selectGovernanceDaoProposalsById } from 'src/app/shared/governance/selectors';
import { getGovernanceDaoProposals } from 'src/app/shared/governance/slice';

import styles from 'src/styles/page.module.scss';

export const NumberOfProposals: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();
  const governanceProposals = useAppSelector(
    selectGovernanceDaoProposalsById(dao),
  );
  const governanceProposalsLoading = useAppSelector(
    selectActionLoading(getGovernanceDaoProposals.typePrefix),
  );

  useMount(() => {
    dispatch(
      getGovernanceDaoProposals({
        contract,
        dao,
      }),
    ).catch((error: unknown) => console.error(error));
  });

  const governanceProposalsData = useFilterMetrics(period, governanceProposals);
  const periods = usePeriods(governanceProposals?.metrics);

  return (
    <>
      <LoadingContainer
        hide={
          isSuccess(governanceProposalsLoading) ||
          isFailed(governanceProposalsLoading)
        }
      />

      <div className={styles.metricsContainer}>
        {governanceProposalsData ? (
          <ChartLine
            periods={periods}
            data={governanceProposalsData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Number of Proposals',
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
