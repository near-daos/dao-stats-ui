import React, { FC, useState, useEffect, MouseEvent } from 'react';
import startCase from 'lodash/startCase';
import { useHistory } from 'react-router';

import { Search, Button } from '../../components';
import { useAppSelector } from '../../store';
import { selectorSelectedContract } from '../shared';
import { useRoutes } from '../../hooks';

import { NETWORKS } from '../../constants';

import styles from './main-page.module.scss';

export const MainPage: FC = () => {
  const [searchType, setSearchType] = useState<NETWORKS>(NETWORKS.Mainnet);
  const selectedContract = useAppSelector(selectorSelectedContract);
  const routes = useRoutes();
  const history = useHistory();

  useEffect(() => {
    const handleScroll = (event: any) => {
      if (event.wheelDelta < 0) {
        history.push(routes.generalInfo);
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => window.removeEventListener('wheel', handleScroll);
  }, [history, routes.generalInfo]);

  return (
    <div className={styles.mainPage}>
      <h1 className={styles.title}>
        This dashboard represents live data collected by the middleware behind
        Dapp
      </h1>

      <h2 className={styles.subTitle}>
        It uses the publicly available RPC and Indexer.
      </h2>

      <Search
        disabled
        className={styles.search}
        searchType={searchType}
        setSearchType={(type) => setSearchType(type)}
      />

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
