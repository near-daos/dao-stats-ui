import React, { FC } from 'react';

import { SvgIcon, Button, Search } from '../../components';

import styles from './ui-kit.module.scss';

export const UiKIt: FC = () => (
  <div className={styles.uiKit}>
    <section className={styles.section}>
      <div className={styles.sectionHeader}>Icons</div>
      <div className={styles.container}>
        <div className={styles.column}>
          <SvgIcon icon="search" />
        </div>
        <div className={styles.column}>
          <SvgIcon icon="crown" />
        </div>
        <div className={styles.column}>
          <SvgIcon icon="arrow" />
        </div>
        <div className={styles.column}>
          <SvgIcon icon="stats" />
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeader}>Buttons</div>
      <div className={styles.container}>
        <div className={styles.column}>
          <Button variant="icon" />
        </div>
        <div className={styles.column}>
          <Button disabled variant="icon" />
        </div>
        <div className={styles.column}>
          <Button>Back to homepage</Button>
        </div>
        <div className={styles.column}>
          <Button disabled>Back to homepage</Button>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHeader}>Search</div>
      <div className={styles.container}>
        <div className={styles.column}>
          <Search
            onChange={(id) => {
              console.log(id);
            }}
          />
        </div>
      </div>
    </section>
  </div>
);
