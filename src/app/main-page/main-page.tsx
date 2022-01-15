import React, { FC, useEffect } from 'react';
import startCase from 'lodash/startCase';
import { generatePath, useHistory } from 'react-router';

import { Button } from '../../components';
import { useAppSelector } from '../../store';
import { selectSelectedContract } from '../shared';
import { useRoutes } from '../../hooks';
import { infinity } from '../../icons';

import styles from './main-page.module.scss';
import { ROUTES } from '../../constants';

export const MainPage: FC = () => {
  const selectedContract = useAppSelector(selectSelectedContract);
  const routes = useRoutes();
  const history = useHistory();

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        history.push(
          generatePath(ROUTES.generalInfo, {
            contract: selectedContract?.contractId,
          }),
        );
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [history, routes, selectedContract?.contractId]);

  return (
    <div className={styles.mainPage}>
      <h1 className={styles.title}>
        A simple dashboard to get insights about different DAOs
      </h1>

      <h2 className={styles.subTitle}>
        For <img className={styles.image} src={infinity} alt="Error 404" />{' '}
        communities
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
