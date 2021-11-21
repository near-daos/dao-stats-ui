import React, { FC } from 'react';

import { WidgetTile, WidgetInfo } from '../../components';

import { ChartLine } from '../../components/charts/line-chart';
import { getRechartsData } from '../../components/charts/rechartsData';

import styles from './general-info.module.scss';

const rechartsData = getRechartsData();

export const GeneralInfo: FC = () => (
  <div className={styles.page}>
    <div className={styles.subpageWrapper}>
      <h1 className={styles.title}>General Info</h1>
      <div className={styles.subpageContent}>
        <div className={styles.widgets}>
          <WidgetTile active>
            <WidgetInfo
              title="Vote through rate"
              number="456"
              percentages={10}
            />
          </WidgetTile>

          <WidgetTile>
            <WidgetInfo
              title="Vote through rate"
              number="456"
              percentages={10}
            />
          </WidgetTile>

          <WidgetTile>
            <WidgetInfo
              title="Vote through rate"
              number="456"
              percentages={10}
            />
          </WidgetTile>
        </div>

        <div className={styles.chart}>
          <ChartLine data={rechartsData} />
        </div>
      </div>
    </div>
  </div>
);
