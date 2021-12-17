import React, { FC, useEffect } from 'react';
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

import { Page, WidgetTile, WidgetInfo } from '../../components';

import styles from './flow.module.scss';
import { FlowInOut } from './in-out';
import { FlowNumberOfTransactions } from './number-of-transactions';

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

  return (
    <Page>
      <div className={styles.widgets}>
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
          />
          <WidgetInfo
            title="Total out"
            number={flow?.totalOut?.count}
            percentages={flow?.totalOut?.growth}
            icon="near"
          />
        </WidgetTile>
        <WidgetTile
          className={styles.widget}
          active={location.pathname === routes.flowTransactions}
          onClick={() => history.push(routes.flowTransactions)}
        >
          <WidgetInfo
            title="Number of Transactions"
            totalIn={flow?.transactionsIn?.count}
            totalOut={flow?.transactionsOut?.count}
            percentages={flow?.transactionsIn?.growth}
          />
          {/* <WidgetInfo
            title="Number of Transactions"
            number={flow?.transactionsOut?.count}
            percentages={flow?.transactionsOut?.growth}
          /> */}
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
