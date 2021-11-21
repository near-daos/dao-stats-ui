import React, { FC } from 'react';
import clsx from 'clsx';

import { Header } from '../header';
import { Sidebar } from '../sidebar';
import { useForbiddenRoutes } from '../../hooks';

import styles from './layout.module.scss';

export const Layout: FC = ({ children }) => {
  const { isForbiddenSidebar } = useForbiddenRoutes();

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>
        {!isForbiddenSidebar ? <Sidebar /> : null}
        <div
          className={clsx(styles.page, {
            [styles.fullWidth]: isForbiddenSidebar,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
