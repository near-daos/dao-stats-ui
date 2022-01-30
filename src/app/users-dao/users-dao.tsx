import React, { FC } from 'react';
import { useMount } from 'react-use';
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  useParams,
  matchPath,
  generatePath,
} from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/store';

import { getUsersDao } from 'src/app/shared/users/slice';
import { selectUsersDaoById } from 'src/app/shared/users/selectors';
import { Page, WidgetTile, WidgetInfo, Widgets } from 'src/components';
import { ROUTES, UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import { ActiveUsers } from './active-users';
import { UsersNumber } from './users-number';
import { Members } from './members';
import { Interactions } from './interactions';

export const UsersDao: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersDaoById(dao));

  useMount(() => {
    if (!users) {
      dispatch(getUsersDao({ dao, contract })).catch((error) =>
        console.error(error),
      );
    }
  });

  return (
    <Page title="Users and Activity">
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
            title="Weekly Active Users"
            number={users?.activeUsers?.count}
            percentages={users?.activeUsers?.growth}
          />
        </WidgetTile>
        <WidgetTile
          className={styles.widget}
          onClick={() =>
            history.push(generatePath(ROUTES.usersDaoAll, { contract, dao }))
          }
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.usersDaoAll,
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
          <Route exact path={ROUTES.usersDao} component={ActiveUsers} />
          <Route exact path={ROUTES.usersDaoAll} component={UsersNumber} />
          <Route exact path={ROUTES.usersMembersDao} component={Members} />
          <Route
            exact
            path={ROUTES.usersInteractionsDao}
            component={Interactions}
          />
        </Switch>
      </div>
    </Page>
  );
};
