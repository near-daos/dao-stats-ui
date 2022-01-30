import React, { FC, useMemo, useRef } from 'react';
import startCase from 'lodash/startCase';
import clsx from 'clsx';
import { useHistory, useLocation } from 'react-router';
import ReactTooltip from 'react-tooltip';
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

const HIDE_DELAY = 2000;

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ className }) => {
  const tooltipSuccess = useRef<HTMLDivElement | null>(null);
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
      copyTextToClipboard(selectedDao.dao).then(() => {
        ReactTooltip.show(tooltipSuccess?.current as Element);

        setTimeout(() => {
          ReactTooltip.hide(tooltipSuccess?.current as Element);
        }, HIDE_DELAY);
      });
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
          <button
            onClick={handleBackClick}
            className={styles.backButton}
            data-tip="See analytics for platform"
            data-class={styles.tooltipBackButton}
          >
            {startCase(selectedContract?.contractId || '')}
          </button>
          <div className={styles.separator}>/</div>
          <button className={styles.daoTitleWrapper} onClick={handlerCopyText}>
            <div
              className={styles.dao}
              data-tip="Click to copy DAO name"
              data-class={styles.tooltipCopy}
            >
              {daoInfo.title}
              <div
                data-tip="Copied!"
                data-class={styles.tooltipCopySuccess}
                ref={tooltipSuccess}
                data-for="success-copy"
              />
            </div>
            <div className={styles.daoContract}>{daoInfo.contract}</div>
          </button>
        </>
      )}
      {selectedDao ? (
        <>
          <ReactTooltip place="bottom" effect="solid" />
          <ReactTooltip
            place="bottom"
            effect="solid"
            id="success-copy"
            clickable
          />
        </>
      ) : null}
    </div>
  );
};
