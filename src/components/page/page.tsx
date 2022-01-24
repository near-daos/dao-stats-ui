import React, { FC } from 'react';

import styles from './page.module.scss';

export type PageProps = {
  title?: string;
};

export const Page: FC<PageProps> = ({ children, title }) => (
  <div className={styles.page}>
    {title ? <div className={styles.title}>{title}</div> : null}
    <div className={styles.content}>{children}</div>
  </div>
);
