import React, { FC, useEffect, useMemo } from 'react';
import {
  useLocation,
  useParams,
  useHistory,
  matchPath,
  Switch,
  Route,
  generatePath,
} from 'react-router';

import { getFlowDao } from 'src/app/shared/flow/slice';
import { selectFlowDaoById } from 'src/app/shared/flow/selectors';
import {
  Page,
  WidgetTile,
  WidgetInfo,
  Widgets,
  Breadcrumbs,
} from 'src/components';
import { useRoutes } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { ROUTES } from 'src/constants';
import styles from 'src/styles/page.module.scss';

import { IncomingFunds } from './funds/incoming';
import { OutgoingFunds } from './funds/outgoing';
import { IncomingTransactions } from './transactions/incoming';
import { OutgoingTransactions } from './transactions/outgoing';

export const FlowDao: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const routes = useRoutes();

  const dispatch = useAppDispatch();
  const flow = useAppSelector(selectFlowDaoById(dao));

  useEffect(() => {
    dispatch(getFlowDao({ contract, dao })).catch((error: unknown) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  }, [contract, dao, dispatch]);

  const breadcrumbs = useMemo(
    () => [
      {
        url: routes.flow,
        name: 'Flow',
      },
      {
        url: routes.flowDao,
        name: dao,
      },
    ],
    [dao, routes],
  );

  return (
    <>
      <Breadcrumbs elements={breadcrumbs} className={styles.breadcrumbs} />
      <Page>
        <Widgets>
          <WidgetTile
            className={styles.widget}
            onClick={() =>
              history.push(generatePath(ROUTES.flowDao, { contract, dao }))
            }
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.flowDao,
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
              icon="near"
              number={flow?.totalIn?.countNear}
            />
          </WidgetTile>
          <WidgetTile
            className={styles.widget}
            onClick={() =>
              history.push(
                generatePath(ROUTES.flowDaoOutgoingFunds, { contract, dao }),
              )
            }
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.flowDaoOutgoingFunds,
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
              icon="near"
              number={flow?.totalOut?.countNear}
            />
          </WidgetTile>
          <WidgetTile
            className={styles.widget}
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.flowDaoIncomingTransactions,
                exact: true,
              }),
            )}
            onClick={() =>
              history.push(
                generatePath(ROUTES.flowDaoIncomingTransactions, {
                  contract,
                  dao,
                }),
              )
            }
          >
            <WidgetInfo
              isRoundNumber
              title="Incoming Transactions"
              number={flow?.transactionsIn?.count}
              percentages={flow?.transactionsIn?.growth}
            />
          </WidgetTile>
          <WidgetTile
            className={styles.widget}
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.flowDaoOutgoingTransactions,
                exact: true,
              }),
            )}
            onClick={() =>
              history.push(
                generatePath(ROUTES.flowDaoOutgoingTransactions, {
                  contract,
                  dao,
                }),
              )
            }
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
            <Route exact path={ROUTES.flowDao} component={IncomingFunds} />
            <Route
              exact
              path={ROUTES.flowDaoOutgoingFunds}
              component={OutgoingFunds}
            />
            <Route
              exact
              path={ROUTES.flowDaoIncomingTransactions}
              component={IncomingTransactions}
            />
            <Route
              exact
              path={ROUTES.flowDaoOutgoingTransactions}
              component={OutgoingTransactions}
            />
          </Switch>
        </div>
      </Page>
    </>
  );
};
