import React, { FC } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router';

import { Page, WidgetTile, WidgetInfo } from '../../components';

import { DaoActivity } from './dao-activity';
import { NumbersDao } from './numbers-dao';
import { Groups } from './groups';
import { ROUTES } from '../../constants';

import styles from './general-info.module.scss';

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
        <Switch>
          <Route exact path={ROUTES.generalInfo} component={NumbersDao} />
          <Route
            exact
            path={ROUTES.generalInfoDaoActivity}
            component={DaoActivity}
          />
          <Route exact path={ROUTES.generalInfoGroups} component={Groups} />
        </Switch>
      </div>
    </Page>
  );
};
