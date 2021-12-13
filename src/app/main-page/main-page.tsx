import React, { FC, useEffect } from 'react';
import startCase from 'lodash/startCase';
import { useHistory } from 'react-router';

import { Search, Button, NetworkSwitcher } from '../../components';
import { useAppSelector } from '../../store';
import { selectorSelectedContract } from '../shared';
import { useRoutes } from '../../hooks';

import styles from './main-page.module.scss';

export const MainPage: FC = () => {
  const selectedContract = useAppSelector(selectorSelectedContract);
  const routes = useRoutes();
  const history = useHistory();

  useEffect(() => {
    const handleScroll = (event: any) => {
      if (event.wheelDelta < 0) {
        // history.push(routes.generalInfo);
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => window.removeEventListener('wheel', handleScroll);
  }, [history, routes.generalInfo]);

  return (
    <div className={styles.mainPage}>
      <h1 className={styles.title}>
        A simple dashboard to get insights about different DAOs and Platforms
      </h1>

      <h2 className={styles.subTitle}>From a community for the communities!</h2>

      <NetworkSwitcher className={styles.switcher} />

      {/* <Search
        disabled
        className={styles.search}
        networkSwitcherClass={styles.switcherDesktop}
      /> */}

      <p className={styles.info}>
        {startCase(selectedContract?.contractId)} stats
      </p>
      <Button
        className={styles.button}
        variant="icon"
        href={routes.generalInfo}
      />
    </div>
  );
};
