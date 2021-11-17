import React, { FC } from 'react';
import { Header } from '../header';
import { Sidebar } from '../sidebar';

import styles from './layout.module.scss';

export const Layout: FC = ({ children }) => (
  <div className={styles.tableLayout}>
    <section className={styles.section}>
      <Header />
    </section>
    <section className={styles.section}>
      <div className={styles.container}>
        <Sidebar />
        {children}
      </div>
    </section>
  </div>
);
