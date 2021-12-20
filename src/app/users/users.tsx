import React, { FC, useEffect, useMemo } from 'react';
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

import { getUsers } from 'src/app/shared/users/slice';
import { selectorUsers } from 'src/app/shared/users/selectors';
import {
  Page,
  WidgetTile,
  WidgetInfo,
  Widgets,
  Breadcrumbs,
} from 'src/components';
import { ROUTES } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import { NumberInteractions } from './number-interactions';
import { NumberUsers } from './number-users';

import { NumberUsersOfDao } from './number-users-of-dao';
import { NumberUsersPerDao } from './number-users-per-dao';
import { NumberInteractionsPerDao } from './number-interactions-per-dao';

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

  const breadcrumbs = useMemo(
    () => [
      {
        url: routes.users,
        name: 'Users and Activity',
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
              number={users?.users?.count}
              percentages={users?.users?.growth}
            />
          </WidgetTile>

          <WidgetTile
            className={styles.widget}
            onClick={() => history.push(routes.usersOfDao)}
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.usersOfDao,
                exact: true,
              }),
            )}
          >
            <WidgetInfo
              title="Users that are member of a DAO"
              number={users?.members?.count}
              percentages={users?.members?.growth}
            />
          </WidgetTile>

          <WidgetTile
            className={styles.widget}
            onClick={() => history.push(routes.usersPerDao)}
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.usersPerDao,
                exact: true,
              }),
            )}
          >
            <WidgetInfo
              title="Average number of users per DAO"
              number={users?.averageUsers?.count}
              percentages={users?.averageUsers?.growth}
            />
          </WidgetTile>

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
              number={users?.interactions?.count}
              percentages={users?.interactions?.growth}
            />
          </WidgetTile>

          <WidgetTile
            className={styles.widget}
            onClick={() => history.push(routes.usersNumberInteractionsPerDao)}
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.usersNumberInteractionsPerDao,
                exact: true,
              }),
            )}
          >
            <WidgetInfo
              title="Average number of Interactions per DAO"
              number={users?.averageInteractions?.count}
              percentages={users?.averageInteractions?.growth}
            />
          </WidgetTile>
        </Widgets>

        <div className={styles.mainContent}>
          <Switch>
            <Route exact path={ROUTES.users} component={NumberUsers} />
            <Route
              exact
              path={ROUTES.usersOfDao}
              component={NumberUsersOfDao}
            />
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
    </>
  );
};
