import React, { FC } from 'react';
import { ChartLine } from 'src/components';
import { getRechartsData } from 'src/components/charts/rechartsData';
import styles from './numbers-dao.module.scss';

const rechartsData = getRechartsData();

export const NumbersDao: FC = () => (
  <div className={styles.chart}>
    <ChartLine data={rechartsData} />
  </div>
);
