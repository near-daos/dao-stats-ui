import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useFilterMetrics, useGovernanceChartData } from 'src/hooks';
import { isPending, isSuccess } from 'src/utils';
import { selectActionLoading } from 'src/store/loading';
import { selectGovernanceDaoProposalsTypesById } from 'src/app/shared/governance/selectors';
import { getGovernanceDaoProposalsTypes } from 'src/app/shared/governance/slice';

import styles from 'src/styles/page.module.scss';

export const ProposalsType: FC = () => {
  const [period, setPeriod] = useState('1y');
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();
  const governanceProposalsTypes = useAppSelector(
    selectGovernanceDaoProposalsTypesById(dao),
  );
  const governanceProposalsTypesLoading = useAppSelector(
    selectActionLoading(getGovernanceDaoProposalsTypes.typePrefix),
  );

  useEffect(() => {
    if (
      !governanceProposalsTypes &&
      !isPending(governanceProposalsTypesLoading)
    ) {
      dispatch(
        getGovernanceDaoProposalsTypes({
          contract,
          dao,
        }),
        // eslint-disable-next-line no-console
      ).catch((error: unknown) => console.error(error));
    }
  }, [
    period,
    contract,
    dispatch,
    governanceProposalsTypes,
    governanceProposalsTypesLoading,
    dao,
  ]);

  const governanceProposalsTypesData = useGovernanceChartData(
    governanceProposalsTypes,
  );

  const governanceProposalsTypesFilteredData = useFilterMetrics(
    period,
    governanceProposalsTypesData,
  );

  return (
    <>
      <LoadingContainer hide={isSuccess(governanceProposalsTypesLoading)} />

      <div className={styles.metricsContainer}>
        {governanceProposalsTypesFilteredData ? (
          <ChartLine
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
