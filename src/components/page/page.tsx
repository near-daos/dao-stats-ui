import React, { FC } from 'react';

import styles from './page.module.scss';

export const Page: FC = ({ children }) => (
  <div className={styles.page}>
    <div className={styles.content}>{children}</div>
  </div>
);
