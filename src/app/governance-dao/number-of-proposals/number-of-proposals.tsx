import React, { FC, useEffect, useState } from 'react';
import { ChartLine, LoadingContainer } from 'src/components';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/store';
import { useFilterMetrics } from 'src/hooks';
import { isPending, isSuccess } from 'src/utils';
import { selectActionLoading } from 'src/store/loading';
import { selectGovernanceDaoProposalsById } from 'src/app/shared/governance/selectors';
import { getGovernanceDaoProposals } from 'src/app/shared/governance/slice';

import styles from 'src/styles/page.module.scss';

export const NumberOfProposals: FC = () => {
  const [period, setPeriod] = useState('1y');
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();
  const governanceProposals = useAppSelector(
    selectGovernanceDaoProposalsById(dao),
  );
  const governanceProposalsLoading = useAppSelector(
    selectActionLoading(getGovernanceDaoProposals.typePrefix),
  );

  useEffect(() => {
    if (!governanceProposals && !isPending(governanceProposalsLoading)) {
      dispatch(
        getGovernanceDaoProposals({
          contract,
          dao,
        }),
        // eslint-disable-next-line no-console
      ).catch((error: unknown) => console.error(error));
    }
  }, [
    governanceProposals,
    dao,
    contract,
    dispatch,
    governanceProposalsLoading,
  ]);

  const governanceProposalsData = useFilterMetrics(period, governanceProposals);

  return (
    <>
      <LoadingContainer hide={isSuccess(governanceProposalsLoading)} />

      <div className={styles.metricsContainer}>
        {governanceProposalsData ? (
          <ChartLine
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
