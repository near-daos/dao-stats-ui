import React, { FC, useEffect, useMemo } from 'react';
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  matchPath,
} from 'react-router';
import { useRoutes } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { ROUTES } from 'src/constants';
import { getFlow } from './slice';
import { selectFlow } from './selectors';

import {
  Page,
  WidgetTile,
  WidgetInfo,
  Widgets,
  Breadcrumbs,
} from '../../components';

import styles from './flow.module.scss';
import { IncomingFunds } from './funds/incoming';
import { IncomingTransactions } from './transactions/incoming';
import { OutgoingFunds } from './funds/outgoing';
import { OutgoingTransactions } from './transactions/outgoing';

export const Flow: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const routes = useRoutes();
  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const flow = useAppSelector(selectFlow);

  useEffect(() => {
    (async () => {
      try {
        if (!flow) {
          await dispatch(getFlow({ contract }));
        }
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, [contract, dispatch, flow]);

  const breadcrumbs = useMemo(
    () => [
      {
        url: routes.flow,
        name: 'Flow',
      },
    ],
    [routes],
  );

  return (
    <>
      <Breadcrumbs elements={breadcrumbs} className={styles.breadcrumbs} />
      <Page>
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
              title="Total in"
              number={flow?.totalIn?.count}
              percentages={flow?.totalIn?.growth}
              icon="near"
              near
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
              title="Total Out"
              number={flow?.totalOut?.count}
              percentages={flow?.totalOut?.growth}
              icon="near"
              near
            />
          </WidgetTile>
          <WidgetTile
            className={styles.widget}
            active={location.pathname === routes.flowIncomingTransactions}
            onClick={() => history.push(routes.flowIncomingTransactions)}
          >
            <WidgetInfo
              title="Incoming Transactions"
              number={flow?.transactionsIn?.count}
              percentages={flow?.transactionsIn?.growth}
            />
          </WidgetTile>
          <WidgetTile
            className={styles.widget}
            active={location.pathname === routes.flowOutgoingTransactions}
            onClick={() => history.push(routes.flowOutgoingTransactions)}
          >
            <WidgetInfo
              title="Outgoing of Transactions"
              number={flow?.transactionsOut?.count}
              percentages={flow?.transactionsOut?.growth}
            />
          </WidgetTile>
          <WidgetTile
            className={styles.widget}
            active={location.pathname === routes.flowTransdappactions}
            onClick={() => history.push(routes.flowTransdappactions)}
            disabled
          >
            <WidgetInfo
              title="Transdappactions"
              number={12442}
              percentages={0}
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
    </>
  );
};
