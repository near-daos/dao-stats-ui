import React, { FC } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router';

import { Page, WidgetTile, WidgetInfo } from '../../components';

import { ROUTES } from '../../constants';
import { AverageCouncilSize } from './average-council-size';
import { NumberInteractions } from './number-interactions';
import { NumberUsers } from './number-users';

import styles from './users.module.scss';

export const Users: FC = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Page title="Users">
      <div className={styles.widgets}>
        <WidgetTile
          className={styles.widget}
          active={location.pathname === ROUTES.users}
          onClick={() => history.push(ROUTES.users)}
        >
          <WidgetInfo title="Users" number="1230" percentages={10} />
        </WidgetTile>

        <WidgetTile
          className={styles.widget}
          onClick={() => history.push(ROUTES.usersAverageCouncilSize)}
          active={location.pathname === ROUTES.usersAverageCouncilSize}
        >
          <WidgetInfo
            title="Average council size"
            number="456"
            percentages={10}
          />
        </WidgetTile>

        <WidgetTile
          className={styles.widget}
          onClick={() => history.push(ROUTES.usersNumberInteractions)}
          active={location.pathname === ROUTES.usersNumberInteractions}
        >
          <WidgetInfo
            title="Number of Interactions"
            number="1087"
            percentages={10}
          />
        </WidgetTile>
      </div>

      <div className={styles.mainContent}>
        <Switch>
          <Route exact path={ROUTES.users} component={NumberUsers} />
          <Route
            exact
            path={ROUTES.usersAverageCouncilSize}
            component={AverageCouncilSize}
          />
          <Route
            exact
            path={ROUTES.usersNumberInteractions}
            component={NumberInteractions}
          />
        </Switch>
      </div>
    </Page>
  );
};
