import React, { FC, useEffect, useMemo } from 'react';
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  useParams,
  matchPath,
  generatePath,
} from 'react-router';
import { useRoutes } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';

import { getUsersDao } from 'src/app/shared/users/slice';
import { selectUsersDaoById } from 'src/app/shared/users/selectors';
import {
  Page,
  WidgetTile,
  WidgetInfo,
  Widgets,
  Breadcrumbs,
} from 'src/components';
import { ROUTES } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import { UsersNumber } from './users-number';
import { Members } from './members';
import { Interactions } from './interactions';

export const UsersDao: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const routes = useRoutes();
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersDaoById(dao));

  useEffect(() => {
    dispatch(getUsersDao({ dao, contract })).catch((error: unknown) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  }, [dao, contract, dispatch]);

  const breadcrumbs = useMemo(
    () => [
      {
        url: routes.users,
        name: 'Users and Activity',
      },
      {
        url: routes.usersDao,
        name: dao,
      },
    ],
    [routes, dao],
  );

  return (
    <>
      <Breadcrumbs elements={breadcrumbs} className={styles.breadcrumbs} />
      <Page>
        <Widgets>
          <WidgetTile
            className={styles.widget}
            onClick={() =>
              history.push(generatePath(ROUTES.usersDao, { contract, dao }))
            }
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.usersDao,
                exact: true,
              }),
            )}
          >
            <WidgetInfo
              title="All users per DAO"
              number={users?.users?.count}
              percentages={users?.users?.growth}
            />
          </WidgetTile>

          <WidgetTile
            className={styles.widget}
            onClick={() =>
              history.push(
                generatePath(ROUTES.usersMembersDao, { contract, dao }),
              )
            }
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.usersMembersDao,
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
            onClick={() =>
              history.push(
                generatePath(ROUTES.usersInteractionsDao, { contract, dao }),
              )
            }
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.usersInteractionsDao,
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
        </Widgets>

        <div className={styles.mainContent}>
          <Switch>
            <Route exact path={ROUTES.usersDao} component={UsersNumber} />
            <Route exact path={ROUTES.usersMembersDao} component={Members} />
            <Route
              exact
              path={ROUTES.usersInteractionsDao}
              component={Interactions}
            />
          </Switch>
        </div>
      </Page>
    </>
  );
};
