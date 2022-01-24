import React, { FC } from 'react';
import startCase from 'lodash/startCase';
import clsx from 'clsx';

import styles from './breadcrumbs.module.scss';
import { useAppSelector } from '../../store';
import { selectCurrentDao, selectSelectedContract } from '../../app/shared';
import { Button } from '../button';

export type BreadcrumbsProps = {
  className?: string;
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ className }) => {
  const selectedContract = useAppSelector(selectSelectedContract);
  const selectedDao = useAppSelector(selectCurrentDao);

  return (
    <div className={clsx(styles.breadcrumbs, className)}>
      {!selectedDao ? (
        <>
          <div className={styles.contractName}>
            {startCase(selectedContract?.contractId || '')}
          </div>
          <div className={styles.info}>Average values for all DAOs</div>
        </>
      ) : (
        <>
          <button className={styles.backButton}>
            {startCase(selectedContract?.contractId || '')}
          </button>
          <div className={styles.separator}>/</div>
          <div className={styles.dao}>{selectedDao.dao}</div>
          <div className={styles.daoContract}>{selectedDao.dao}</div>
        </>
      )}
    </div>
  );
};
