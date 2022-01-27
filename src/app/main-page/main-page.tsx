import React, { FC, useEffect } from 'react';
import startCase from 'lodash/startCase';
import { generatePath, useHistory } from 'react-router';

import { Button } from 'src/components';
import { useAppSelector } from 'src/store';
import { useRoutes } from 'src/hooks';
import { near } from 'src/icons';
import { ROUTES } from 'src/constants';
import { selectCurrentDao, selectSelectedContract } from 'src/app/shared';

import styles from './main-page.module.scss';

export const MainPage: FC = () => {
  const selectedContract = useAppSelector(selectSelectedContract);
  const dao = useAppSelector(selectCurrentDao);
  const routes = useRoutes();
  const history = useHistory();

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        if (dao) {
          history.push(
            generatePath(ROUTES.generalInfoDao, {
              contract: selectedContract?.contractId,
              dao: dao.dao,
            }),
          );
        } else {
          history.push(
            generatePath(ROUTES.generalInfo, {
              contract: selectedContract?.contractId,
            }),
          );
        }
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [dao, history, routes, selectedContract?.contractId]);

  return (
    <div className={styles.mainPage}>
      <h1 className={styles.title}>
        A simple dashboard to get insights about different DAOs
      </h1>

      <h2 className={styles.subTitle}>
        <span>For</span> <img className={styles.image} src={near} alt="Near" />{' '}
        <span>communities</span>
      </h2>

      <p className={styles.info}>
        {startCase(selectedContract?.contractId)} DAO
      </p>
      <Button
        className={styles.button}
        variant="icon"
        href={routes.generalInfo}
      />
    </div>
  );
};
