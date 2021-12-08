import React, { FC, useState } from 'react';

import { Tabs, Search, Button } from '../../components';
import { useAppSelector } from '../../store';
import { selectorSelectedContract } from '../shared';
import { useOptionsForContract, useRoutes } from '../../hooks';

import { NETWORKS } from '../../constants';

import styles from './main-page.module.scss';

export const MainPage: FC = () => {
  const [searchType, setSearchType] = useState<NETWORKS>(NETWORKS.Mainnet);
  const contractTabOptions = useOptionsForContract();
  const selectedContract = useAppSelector(selectorSelectedContract);
  const routes = useRoutes();

  return (
    <div className={styles.mainPage}>
      <h1 className={styles.title}>
        This dashboard represents live data collected by the middleware behind
        Dapp
      </h1>

      <h2 className={styles.subTitle}>
        It uses the publicly available RPC and Indexer.
      </h2>

      <Tabs
        className={styles.tabs}
        options={contractTabOptions}
        defaultValue={selectedContract?.contractId}
      />
      <Search
        className={styles.search}
        searchType={searchType}
        setSearchType={(type) => setSearchType(type)}
      />

      <p className={styles.info}>{selectedContract?.contractId} stats</p>
      <Button
        className={styles.button}
        variant="icon"
        href={routes.generalInfo}
      />
    </div>
  );
};
