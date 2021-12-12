import React, { FC, useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  useParams,
  matchPath,
} from 'react-router';
import { useRoutes } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getUsers } from './slice';
import { selectorUsers } from './selectors';

import { Page, WidgetTile, WidgetInfo, Widgets } from '../../components';

import { ROUTES } from '../../constants';
import { NumberInteractions } from './number-interactions';
import { NumberUsers } from './number-users';

import { NumberUsersOfDao } from './number-users-of-dao';
import { NumberUsersPerDao } from './number-users-per-dao';
import { NumberInteractionsPerDao } from './number-interactions-per-dao';

import styles from './users.module.scss';

export const Users: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const routes = useRoutes();
  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectorUsers);

  useEffect(() => {
    (async () => {
      try {
        if (!users) {
          await dispatch(getUsers({ contract }));
        }
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, [contract, dispatch, users]);

  return (
    <Page title="Users and Activity">
      <Widgets>
        <WidgetTile
          className={styles.widget}
          onClick={() => history.push(routes.users)}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.users,
              exact: true,
            }),
          )}
        >
          <WidgetInfo
            title="All users on a platfrom"
            number={users?.users.count}
            percentages={users?.users.growth}
          />
        </WidgetTile>

        <WidgetTile
          disabled
          className={styles.widget}
          onClick={() => history.push(routes.usersOfDao)}
          active={location.pathname === routes.usersOfDao}
        >
          <WidgetInfo
            title="Users that are member of a DAO"
            number={4644}
            percentages={10}
          />
        </WidgetTile>

        <WidgetTile
          disabled
          className={styles.widget}
          onClick={() => history.push(routes.usersPerDao)}
          active={location.pathname === routes.usersPerDao}
        >
          <WidgetInfo
            title="Average number of users per DAO"
            number={46}
            percentages={10}
          />
        </WidgetTile>

        {/* <WidgetTile
          className={styles.widget}
          onClick={() => history.push(routes.usersAverageCouncilSize)}
          active={location.pathname === routes.usersAverageCouncilSize}
        >
          <WidgetInfo
            title="Average council size"
            number={users?.council.count}
            percentages={users?.council.growth}
          />
        </WidgetTile> */}

        <WidgetTile
          className={styles.widget}
          onClick={() => history.push(routes.usersNumberInteractions)}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.usersNumberInteractions,
              exact: true,
            }),
          )}
        >
          <WidgetInfo
            title="Number of Interactions"
            number={users?.interactions.count}
            percentages={users?.interactions.growth}
          />
        </WidgetTile>

        <WidgetTile
          className={styles.widget}
          onClick={() => history.push(routes.usersNumberInteractionsPerDao)}
          active={location.pathname === routes.usersNumberInteractionsPerDao}
          disabled
        >
          <WidgetInfo
            title="Average number of Interactions per DAO"
            number={1087}
            percentages={10}
          />
        </WidgetTile>
      </Widgets>

      <div className={styles.mainContent}>
        <Switch>
          <Route exact path={ROUTES.users} component={NumberUsers} />
          <Route exact path={ROUTES.usersOfDao} component={NumberUsersOfDao} />
          <Route
            exact
            path={ROUTES.usersPerDao}
            component={NumberUsersPerDao}
          />
          <Route
            exact
            path={ROUTES.usersNumberInteractions}
            component={NumberInteractions}
          />
          <Route
            exact
            path={ROUTES.usersNumberInteractionsPerDao}
            component={NumberInteractionsPerDao}
          />
        </Switch>
      </div>
    </Page>
  );
};
