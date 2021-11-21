import React, { FC, useState } from 'react';
import { Tabs, Search, Button } from '../../components';

import styles from './main-page.module.scss';
import { ROUTES } from '../../constants';

export const MainPage: FC = () => {
  const [searchType, setSearchType] = useState<'mainnet' | 'testnet'>(
    'mainnet',
  );

  return (
    <div className={styles.mainPage}>
      <h1 className={styles.title}>
        This dashboard represents live data collected by the middleware behind
        Dapp
      </h1>

      <h2 className={styles.subTitle}>
        It uses the publicly available RPC and and Indexer.
      </h2>

      <Tabs
        className={styles.tabs}
        options={[
          {
            label: 'Sputnik DAO',
            value: 'sputnik',
          },
          {
            label: 'Astro',
            value: 'astro',
          },
        ]}
      />
      <Search
        className={styles.search}
        searchType={searchType}
        setSearchType={(type) => setSearchType(type)}
      />

      <p className={styles.info}>Sputnik DAO stats</p>
      <Button
        className={styles.button}
        variant="icon"
        href={ROUTES.generalInfo}
      />
    </div>
  );
};
