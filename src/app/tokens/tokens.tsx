import React, { FC } from 'react';

import { Page, WidgetTile, WidgetInfo } from '../../components';

import { ChartLine } from '../../components/charts/line-chart';
import { getRechartsData } from '../../components/charts/rechartsData';

import styles from './tokens.module.scss';

const rechartsData = getRechartsData();

export const Tokens: FC = () => (
  <Page title="Tokens">
    <div className={styles.widgets}>
      <WidgetTile active>
        <WidgetInfo title="Number of DAOs" number="456" percentages={10} />
      </WidgetTile>

      <WidgetTile>
        <WidgetInfo title="DAOs activity" number="456" percentages={10} />
      </WidgetTile>

      <WidgetTile>
        <WidgetInfo title="Groups" number="456" percentages={10} />
      </WidgetTile>
    </div>

    <div className={styles.chart}>
      <ChartLine data={rechartsData} />
    </div>
  </Page>
);
