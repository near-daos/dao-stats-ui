import React, { FC, useState } from 'react';

import { useForbiddenRoutes } from 'src/hooks';

import { Header } from '../header';
import { Sidebar } from '../sidebar';
import { Footer } from '../footer';
import { Breadcrumbs } from '../breadcrumbs';

import styles from './layout.module.scss';

export const Layout: FC = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const { isForbiddenHeader } = useForbiddenRoutes();

  return (
    <div className={styles.layout}>
      <Header isOpen={isOpen} setOpen={setOpen} />
      <div className={styles.container}>
        {!isForbiddenHeader ? <Breadcrumbs /> : null}
        <div className={styles.wrapper}>
          <Sidebar isOpen={isOpen} setOpen={setOpen} />
          <div className={styles.page}>{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
