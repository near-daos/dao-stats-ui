import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ChartLine, LoadingContainer } from 'src/components';
import { useFilterMetrics } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectGeneralDaoGroupsById } from 'src/app/shared/general/selectors';
import { getGeneralDaoGroups } from 'src/app/shared/general/slice';
import { selectActionLoading } from 'src/store/loading';
import { isSuccess, isPending, isNotAsked } from 'src/utils';

import styles from 'src/styles/page.module.scss';

export const Groups: FC = () => {
  const [period, setPeriod] = useState('1y');
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectGeneralDaoGroupsById(dao));
  const getGeneralDaoGroupsLoading = useAppSelector(
    selectActionLoading(getGeneralDaoGroups.typePrefix),
  );

  useEffect(() => {
    (async () => {
      try {
        if (
          (!groups || isNotAsked(getGeneralDaoGroupsLoading)) &&
          !isPending(getGeneralDaoGroupsLoading)
        ) {
          await dispatch(
            getGeneralDaoGroups({
              contract,
              dao,
            }),
          );
        }
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, [contract, dao, dispatch, getGeneralDaoGroupsLoading, groups]);

  const groupsData = useFilterMetrics(period, groups);

  return (
    <>
      <LoadingContainer hide={isSuccess(getGeneralDaoGroupsLoading)} />

      <div className={styles.metricsContainer}>
        {groupsData ? (
          <ChartLine
            data={groupsData}
            period={period}
            setPeriod={setPeriod}
            lines={[{ name: 'Groups', color: '#E33F84', dataKey: 'count' }]}
          />
        ) : null}
      </div>
    </>
  );
};