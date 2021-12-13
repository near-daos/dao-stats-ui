import React, { FC } from 'react';
import styles from './page.module.scss';

export type PageProps = {
  title?: string;
};

export const Page: FC<PageProps> = ({ title = '', children }) => (
  <div className={styles.page}>
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.content}>{children}</div>
  </div>
);
