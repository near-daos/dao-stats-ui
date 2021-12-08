/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useState } from 'react';
import clsx from 'clsx';

import { Header } from '../header';
import { Sidebar } from '../sidebar';
import { useForbiddenRoutes } from '../../hooks';

import styles from './layout.module.scss';

export const Layout: FC = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);

  const { isForbiddenSidebar } = useForbiddenRoutes();

  return (
    <div className={styles.layout}>
      <Header isOpened={isOpened} setIsOpened={setIsOpened} />
      <div className={styles.container}>
        {!isForbiddenSidebar ? <Sidebar isOpened={isOpened} /> : null}
        <div
          className={clsx(styles.page, {
            [styles.fullWidth]: isForbiddenSidebar,
            [styles.blur]: isOpened,
          })}
          onClick={() => setIsOpened(false)}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
