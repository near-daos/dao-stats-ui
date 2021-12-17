import React, { FC, useState } from 'react';

import { Header } from '../header';
import { Sidebar } from '../sidebar';
import { Footer } from '../footer';

import styles from './layout.module.scss';

export const Layout: FC = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Header isOpen={isOpen} setOpen={setOpen} />
      <div className={styles.container}>
        <Sidebar isOpen={isOpen} setOpen={setOpen} />
        <div className={styles.page}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};
