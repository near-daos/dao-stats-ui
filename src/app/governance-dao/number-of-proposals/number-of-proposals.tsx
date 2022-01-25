import React, { FC, useState } from 'react';
import { useMount, useUnmount } from 'react-use';
import { ChartLine, LoadingContainer } from 'src/components';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useFilterMetrics, usePeriods } from 'src/hooks';
import { isFailed, isSuccess } from 'src/utils';
import { selectActionLoading } from 'src/app/shared';
import {
  selectGovernanceDaoProposalsById,
  selectGovernanceError,
} from 'src/app/shared/governance/selectors';
import {
  clearGovernanceError,
  getGovernanceDaoProposals,
} from 'src/app/shared/governance/slice';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const NumberOfProposals: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectGovernanceError);
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
    ).catch((err) => console.error(err));
  });

  useUnmount(() => {
    dispatch(clearGovernanceError());
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
      {error ? <p className={styles.error}>{error}</p> : null}
      {governanceProposalsData?.metrics?.length === 0
        ? 'Not enough data'
        : null}
      <div className={styles.metricsContainer}>
        {governanceProposalsData && governanceProposalsData?.metrics?.length ? (
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
