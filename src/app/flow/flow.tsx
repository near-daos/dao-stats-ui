import React, { FC } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import { ROUTES } from 'src/constants';

import { Page, WidgetTile, WidgetInfo } from '../../components';

import styles from './flow.module.scss';
import { FlowInOut } from './in-out';
import { FlowNumberOfTransactions } from './number-of-transactions';

export const Flow: FC = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Page title="Flow">
      <div className={styles.widgets}>
        <WidgetTile
          className={styles.widget}
          active={location.pathname === ROUTES.flow}
          onClick={() => history.push(ROUTES.flow)}
        >
          <WidgetInfo
            title="Total in"
            number={2290}
            percentages={10}
            icon="near"
          />
          <WidgetInfo
            title="Total out"
            number={2290}
            percentages={10}
            icon="near"
          />
        </WidgetTile>
        <WidgetTile
          className={styles.widget}
          active={location.pathname === ROUTES.flowTransactions}
          onClick={() => history.push(ROUTES.flowTransactions)}
        >
          <WidgetInfo
            title="Number of Transactions"
            number={16.193}
            percentages={10}
          />
        </WidgetTile>
      </div>

      <div className={styles.mainContent}>
        <Switch>
          <Route exact path={ROUTES.flow} component={FlowInOut} />
          <Route
            path={ROUTES.flowTransactions}
            component={FlowNumberOfTransactions}
          />
        </Switch>
      </div>
    </Page>
  );
};
