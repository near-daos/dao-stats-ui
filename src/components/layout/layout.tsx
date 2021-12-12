import React, { FC, useState } from 'react';
import clsx from 'clsx';

import { Header } from '../header';
import { Sidebar } from '../sidebar';
import { useForbiddenRoutes } from '../../hooks';

import styles from './layout.module.scss';

export const Layout: FC = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  const { isForbiddenSidebar } = useForbiddenRoutes();

  return (
    <div className={styles.layout}>
      <Header isOpen={isOpen} setOpen={setOpen} />
      <div className={styles.container}>
        {!isForbiddenSidebar ? (
          <Sidebar isOpen={isOpen} setOpen={setOpen} />
        ) : null}
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
