import React, { FC } from 'react';

import styles from './title-cell.module.scss';

export type TitleCell = {
  logo?: string;
  label?: string;
  domain?: string;
};

export const TitleCell: FC<TitleCell> = ({ logo, label, domain }) => (
  <div className={styles.titleCell}>
    {logo && <img className={styles.logo} src={logo} alt="" />}
    <div className={styles.content}>
      <div className={styles.label}>{label}</div>
      <div className={styles.domain}>{domain}</div>
    </div>
  </div>
);
