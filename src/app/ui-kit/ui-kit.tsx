import React, { FC } from 'react';

import { SvgIcon } from '../../components';

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
  </div>
);
