import React, { FC, useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  useParams,
} from 'react-router';
import { useRoutes } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getUsers } from './slice';
import { selectorUsers } from './selectors';

import { Page, WidgetTile, WidgetInfo } from '../../components';

import { ROUTES } from '../../constants';
import { AverageCouncilSize } from './average-council-size';
import { NumberInteractions } from './number-interactions';
import { NumberUsers } from './number-users';

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
        await dispatch(getUsers({ contract }));
      } catch (error: unknown) {
        console.error(error);
      }
    })();
  }, [contract, dispatch]);

  return (
    <Page title="Users">
      <div className={styles.widgets}>
        <WidgetTile
          className={styles.widget}
          active={location.pathname === routes.users}
          onClick={() => history.push(routes.users)}
        >
          <WidgetInfo
            title="Users"
            number={users?.users.count}
            percentages={users?.users.growth}
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
          active={location.pathname === routes.usersNumberInteractions}
        >
          <WidgetInfo
            title="Number of Interactions"
            number={users?.interactions.count}
            percentages={users?.interactions.growth}
          />
        </WidgetTile>
      </div>

      <div className={styles.mainContent}>
        <Switch>
          <Route exact path={ROUTES.users} component={NumberUsers} />
          <Route
            exact
            path={ROUTES.usersAverageCouncilSize}
            component={AverageCouncilSize}
          />
          <Route
            exact
            path={ROUTES.usersNumberInteractions}
            component={NumberInteractions}
          />
        </Switch>
      </div>
    </Page>
  );
};
