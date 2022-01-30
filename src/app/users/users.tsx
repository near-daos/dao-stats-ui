import React, { FC } from 'react';
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  useParams,
  matchPath,
} from 'react-router';
import { useMount } from 'react-use';

import { useRoutes } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';

import { getUsers } from 'src/app/shared/users/slice';
import { selectorUsers } from 'src/app/shared/users/selectors';
import { Page, WidgetTile, WidgetInfo, Widgets } from 'src/components';
import { ROUTES, UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import { UsersNumber } from './users-number';
import { ActiveUsers } from './active-users';
import { Members } from './members';
import { AverageUsers } from './average-users';
import { Interactions } from './interactions';
import { AverageInteractions } from './average-interactions';

export const Users: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const routes = useRoutes();
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectorUsers);

  useMount(() => {
    if (!users) {
      dispatch(getUsers({ contract })).catch((err: unknown) =>
        console.error(err),
      );
    }
  });

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
            title="Weekly Active Users"
            number={users?.activeUsers?.count}
            percentages={users?.activeUsers?.growth}
          />
        </WidgetTile>
        <WidgetTile
          className={styles.widget}
          onClick={() => history.push(routes.usersAll)}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.usersAll,
              exact: true,
            }),
          )}
        >
          <WidgetInfo
            isRoundNumber
            title="All users on a platform"
            number={users?.users?.count}
            percentages={users?.users?.growth}
          />
        </WidgetTile>

        <WidgetTile
          className={styles.widget}
          onClick={() => history.push(routes.usersMembers)}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.usersMembers,
              exact: true,
            }),
          )}
        >
          <WidgetInfo
            isRoundNumber
            title="Users that are member of a DAO"
            number={users?.members?.count}
            percentages={users?.members?.growth}
          />
        </WidgetTile>

        <WidgetTile
          className={styles.widget}
          onClick={() => history.push(routes.usersAverageUsers)}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.usersAverageUsers,
              exact: true,
            }),
          )}
        >
          <WidgetInfo
            isRoundNumber
            title="Average number of users per DAO"
            number={users?.averageUsers?.count}
            percentages={users?.averageUsers?.growth}
          />
        </WidgetTile>

        <WidgetTile
          className={styles.widget}
          onClick={() => history.push(routes.usersInteractions)}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.usersInteractions,
              exact: true,
            }),
          )}
        >
          <WidgetInfo
            isRoundNumber
            title="Number of Interactions"
            number={users?.interactions?.count}
            percentages={users?.interactions?.growth}
          />
        </WidgetTile>

        <WidgetTile
          className={styles.widget}
          onClick={() => history.push(routes.usersAverageInteractions)}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.usersAverageInteractions,
              exact: true,
            }),
          )}
        >
          <WidgetInfo
            isRoundNumber
            title="Average number of Interactions per DAO"
            number={users?.averageInteractions?.count}
            percentages={users?.averageInteractions?.growth}
          />
        </WidgetTile>
      </Widgets>

      <div className={styles.mainContent}>
        <Switch>
          <Route exact path={ROUTES.users} component={ActiveUsers} />
          <Route exact path={ROUTES.usersAll} component={UsersNumber} />
          <Route exact path={ROUTES.usersMembers} component={Members} />
          <Route
            exact
            path={ROUTES.usersAverageUsers}
            component={AverageUsers}
          />
          <Route
            exact
            path={ROUTES.usersInteractions}
            component={Interactions}
          />
          <Route
            exact
            path={ROUTES.usersAverageInteractions}
            component={AverageInteractions}
          />
        </Switch>
      </div>
    </Page>
  );
};
