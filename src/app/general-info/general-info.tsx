import React, { FC } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router';

import { leaderboardData } from 'src/components/leaderboard/leaderboardData';
import {
  Page,
  WidgetTile,
  WidgetInfo,
  Tabs,
  Leaderboard,
} from '../../components';

import { ChartLine } from '../../components/charts/line-chart';
import { getRechartsData } from '../../components/charts/rechartsData';

import { DaoActivity } from './dao-activity';
import { NumbersDao } from './numbers-dao';
import { Groups } from './groups';
import { ROUTES } from '../../constants';

import styles from './general-info.module.scss';

const rechartsData = getRechartsData();

const tabOptions = [
  {
    label: 'History data',
    value: 'history-data',
  },
  { label: 'Leaderboard', value: 'leaderboard' },
];

export const GeneralInfo: FC = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Page title="General info">
      <div className={styles.widgets}>
        <WidgetTile
          className={styles.widget}
          active={location.pathname === ROUTES.generalInfo}
          onClick={() => history.push(ROUTES.generalInfo)}
        >
          <WidgetInfo title="Number of DAOs" number="456" percentages={10} />
        </WidgetTile>

        <WidgetTile
          className={styles.widget}
          onClick={() => history.push(ROUTES.generalInfoDaoActivity)}
          active={location.pathname === ROUTES.generalInfoDaoActivity}
        >
          <WidgetInfo title="DAOs activity" number="456" percentages={10} />
        </WidgetTile>

        <WidgetTile
          className={styles.widget}
          onClick={() => history.push(ROUTES.generalInfoGroups)}
          active={location.pathname === ROUTES.generalInfoGroups}
        >
          <WidgetInfo title="Groups" number="456" percentages={10} />
        </WidgetTile>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.tabWrapper}>
          <Tabs variant="small" options={tabOptions} className={styles.tabs} />
        </div>
        <div className={styles.chart}>
          <Switch>
            <Route exact path={ROUTES.generalInfo} component={NumbersDao} />
            <Route
              exact
              path={ROUTES.generalInfoDaoActivity}
              component={DaoActivity}
            />
            <Route exact path={ROUTES.generalInfoGroups} component={Groups} />
          </Switch>
          <ChartLine data={rechartsData} />
          <Leaderboard data={leaderboardData} />
        </div>
      </div>
    </Page>
  );
};
