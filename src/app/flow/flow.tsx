import React, { FC } from 'react';
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  matchPath,
} from 'react-router';
import { useMount } from 'react-use';
import { useRoutes } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { ROUTES, UrlParams } from 'src/constants';
import { getFlow, selectFlow } from 'src/app/shared/flow';
import { Page, WidgetTile, WidgetInfo, Widgets } from 'src/components';
import styles from 'src/styles/page.module.scss';

import { IncomingFunds } from './funds/incoming';
import { IncomingTransactions } from './transactions/incoming';
import { OutgoingFunds } from './funds/outgoing';
import { OutgoingTransactions } from './transactions/outgoing';

export const Flow: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const routes = useRoutes();
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const flow = useAppSelector(selectFlow);

  useMount(() => {
    if (!flow) {
      dispatch(getFlow({ contract })).catch((error: unknown) => {
        console.error(error);
      });
    }
  });

  return (
    <Page title="Flow">
      <Widgets>
        <WidgetTile
          className={styles.widget}
          onClick={() => history.push(routes.flow)}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.flow,
              exact: true,
            }),
          )}
        >
          <WidgetInfo
            isCurrency
            isRoundNumber
            title="Total in"
            number={flow?.totalIn?.count}
            percentages={flow?.totalIn?.growth}
          />
          <WidgetInfo
            isRoundNumber
            isSecondary
            icon="nearRound"
            number={flow?.totalIn?.countNear}
          />
        </WidgetTile>
        <WidgetTile
          className={styles.widget}
          onClick={() => history.push(routes.flowOutgoingFunds)}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.flowOutgoingFunds,
              exact: true,
            }),
          )}
        >
          <WidgetInfo
            isCurrency
            isRoundNumber
            title="Total Out"
            number={flow?.totalOut?.count}
            percentages={flow?.totalOut?.growth}
          />
          <WidgetInfo
            isRoundNumber
            isSecondary
            icon="nearRound"
            number={flow?.totalOut?.countNear}
          />
        </WidgetTile>
        <WidgetTile
          className={styles.widget}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.flowIncomingTransactions,
              exact: true,
            }),
          )}
          onClick={() => history.push(routes.flowIncomingTransactions)}
        >
          <WidgetInfo
            isRoundNumber
            title="Incoming Transactions"
            number={flow?.transactionsIn?.count}
            percentages={flow?.transactionsIn?.growth}
          />
        </WidgetTile>
        <WidgetTile
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.flowOutgoingTransactions,
              exact: true,
            }),
          )}
          className={styles.widget}
          onClick={() => history.push(routes.flowOutgoingTransactions)}
        >
          <WidgetInfo
            isRoundNumber
            title="Outgoing Transactions"
            number={flow?.transactionsOut?.count}
            percentages={flow?.transactionsOut?.growth}
          />
        </WidgetTile>
      </Widgets>

      <div className={styles.mainContent}>
        <Switch>
          <Route exact path={ROUTES.flow} component={IncomingFunds} />
          <Route
            exact
            path={ROUTES.flowOutgoingFunds}
            component={OutgoingFunds}
          />
          <Route
            exact
            path={ROUTES.flowIncomingTransactions}
            component={IncomingTransactions}
          />
          <Route
            exact
            path={ROUTES.flowOutgoingTransactions}
            component={OutgoingTransactions}
          />
        </Switch>
      </div>
    </Page>
  );
};
