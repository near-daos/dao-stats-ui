import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useMount, useUnmount } from 'react-use';

import { ChartLine, LoadingContainer } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  useFilterMetrics,
  useGovernanceChartData,
  usePeriods,
} from 'src/hooks';
import { isFailed, isSuccess } from 'src/utils';
import { selectActionLoading } from 'src/app/shared';
import {
  selectGovernanceDaoProposalsTypesById,
  selectGovernanceError,
} from 'src/app/shared/governance/selectors';
import {
  clearGovernanceError,
  getGovernanceDaoProposalsTypes,
} from 'src/app/shared/governance/slice';
import { UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const ProposalsType: FC = () => {
  const [period, setPeriod] = useState('All');
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectGovernanceError);
  const governanceProposalsTypes = useAppSelector(
    selectGovernanceDaoProposalsTypesById(dao),
  );
  const governanceProposalsTypesLoading = useAppSelector(
    selectActionLoading(getGovernanceDaoProposalsTypes.typePrefix),
  );

  useMount(() => {
    if (!governanceProposalsTypes) {
      dispatch(
        getGovernanceDaoProposalsTypes({
          contract,
          dao,
        }),
      ).catch((err) => console.error(err));
    }
  });

  useUnmount(() => {
    dispatch(clearGovernanceError());
  });

  const governanceProposalsTypesData = useGovernanceChartData(
    governanceProposalsTypes,
  );
  const periods = usePeriods(governanceProposalsTypesData?.metrics);

  const governanceProposalsTypesFilteredData = useFilterMetrics(
    period,
    governanceProposalsTypesData,
  );

  return (
    <>
      <LoadingContainer
        hide={
          isSuccess(governanceProposalsTypesLoading) ||
          isFailed(governanceProposalsTypesLoading)
        }
      />
      {error ? <p className={styles.error}>{error}</p> : null}
      {governanceProposalsTypesFilteredData?.metrics?.length === 0
        ? 'Not enough data'
        : null}
      <div className={styles.metricsContainer}>
        {governanceProposalsTypesFilteredData &&
        governanceProposalsTypesFilteredData?.metrics?.length ? (
          <ChartLine
            periods={periods}
            data={governanceProposalsTypesFilteredData}
            period={period}
            setPeriod={setPeriod}
            lines={[
              {
                name: 'Governance',
                color: '#E33F84',
                dataKey: 'governance',
              },
              {
                name: 'Financial',
                color: '#8F40DD',
                dataKey: 'financial',
              },
              {
                name: 'Bounties',
                color: '#5D75E9',
                dataKey: 'bounties',
              },
              {
                name: 'Members',
                color: '#81CEEE',
                dataKey: 'members',
              },
            ]}
          />
        ) : null}
      </div>
    </>
  );
};
