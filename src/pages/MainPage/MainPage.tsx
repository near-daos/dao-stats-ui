import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Search, Button } from '../../components';
import logo from '../../images/daostats.svg';
import styles from './mainPage.module.scss';

export const MainPage: FC = () => {
  const [searchType, setSearchType] = useState<'mainnet' | 'testnet'>(
    'mainnet',
  );

  return (
    <div className={styles.uiKit}>
      <section className={styles.section}>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </section>

      <section className={styles.flexWrapper}>
        <p className={styles.mainText}>
          This dashboard represents live data collected by the middleware behind
          Dapp
        </p>

        <p className={styles.paragraphItem}>
          It uses the publicly available RPC and and Indexer.
        </p>

        <div className={styles.tabs}>
          <Tabs
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
        </div>

        <div className={styles.search}>
          <Search
            inputProps={{ type: 'text' }}
            searchType={searchType}
            setSearchType={(type) => setSearchType(type)}
          />
        </div>

        <p className={styles.paragraphItem}>Sputnik DAO stats</p>
        <div className={styles.button}>
          <Button variant="icon" href="/ui-kit" />
        </div>
      </section>
    </div>
  );
};
