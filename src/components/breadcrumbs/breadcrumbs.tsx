import React, { FC, useMemo } from 'react';
import startCase from 'lodash/startCase';
import clsx from 'clsx';
import { useHistory, useLocation } from 'react-router';

import { useRoutes } from 'src/hooks';
import {
  clearDao,
  selectCurrentDao,
  selectSelectedContract,
} from 'src/app/shared';
import { useAppDispatch, useAppSelector } from 'src/store';
import { copyTextToClipboard } from 'src/utils';

import styles from './breadcrumbs.module.scss';

export type BreadcrumbsProps = {
  className?: string;
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  const selectedContract = useAppSelector(selectSelectedContract);
  const selectedDao = useAppSelector(selectCurrentDao);

  const history = useHistory();
  const location = useLocation();

  const routes = useRoutes();

  const daoInfo = useMemo(() => {
    if (!selectedDao) {
      return {
        title: '',
        contract: '',
      };
    }

    const parsedDao = selectedDao?.dao.split('.');
    const [, ...descriptionArray] = parsedDao;

    return {
      title: parsedDao[0],
      contract: `.${descriptionArray.join('.')}`,
    };
  }, [selectedDao]);

  const handlerCopyText = () => {
    if (selectedDao?.dao) {
      copyTextToClipboard(selectedDao.dao);
    }
  };

  const handleBackClick = () => {
    if (!selectedDao) {
      return;
    }

    let routeToGo;
    const pathname = location.pathname || '';

    if (pathname.startsWith(routes.generalInfo)) {
      routeToGo = routes.generalInfo;
    }

    if (pathname.startsWith(routes.users)) {
      routeToGo = routes.users;
    }

    if (pathname.startsWith(routes.governance)) {
      routeToGo = routes.governance;
    }

    if (pathname.startsWith(routes.flow)) {
      routeToGo = routes.flow;
    }

    if (pathname.startsWith(routes.tvl)) {
      routeToGo = routes.tvl;
    }

    if (pathname.startsWith(routes.tokens)) {
      routeToGo = routes.tokens;
    }

    if (routeToGo) {
      dispatch(clearDao());
      history.push(routeToGo);
    }
  };

  return (
    <div className={clsx(className, styles.breadcrumbs)}>
      {!selectedDao ? (
        <div className={styles.contractNameWrapper}>
          <div className={styles.contractName}>
            {startCase(selectedContract?.contractId || '')}
          </div>
          <div className={styles.info}>Average values for all DAOs</div>
        </div>
      ) : (
        <>
          <button onClick={handleBackClick} className={styles.backButton}>
            {startCase(selectedContract?.contractId || '')}
          </button>
          <div className={styles.separator}>/</div>
          <button className={styles.daoTitleWrapper} onClick={handlerCopyText}>
            <div className={styles.dao}>{daoInfo.title}</div>
            <div className={styles.daoContract}>{daoInfo.contract}</div>
          </button>
        </>
      )}
    </div>
  );
};
