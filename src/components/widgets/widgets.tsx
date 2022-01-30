import React, { FC } from 'react';
import styles from './widgets.module.scss';

export const Widgets: FC = ({ children }) => (
  <div className={styles.widgets}>
    {children}
    {/* <div className={styles.scroll}>{children}</div> */}
  </div>
);
