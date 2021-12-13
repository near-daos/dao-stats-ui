import React, { FC, useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation,
  useParams,
  useHistory,
  matchPath,
} from 'react-router';

import { Page, WidgetTile, WidgetInfo, Widgets } from '../../components';
import { ActiveDao } from './active-dao';
import { NumbersDao } from './numbers-dao';
import { Groups } from './groups';
import { useRoutes } from '../../hooks';
import { useAppDispatch, useAppSelector } from '../../store';
import { getGeneral } from './slice';
import { selectGeneral } from './selectors';
import { ROUTES } from '../../constants';

import styles from './general-info.module.scss';

export const GeneralInfo: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const routes = useRoutes();
  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const general = useAppSelector(selectGeneral);

  useEffect(() => {
    (async () => {
      try {
        if (!general) {
          await dispatch(getGeneral({ contract }));
        }
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, [general, contract, dispatch]);

  return (
    <Page title="General info">
      <Widgets>
        <WidgetTile
          className={styles.widget}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.generalInfo,
              exact: true,
            }),
          )}
          onClick={() => history.push(routes.generalInfo)}
        >
          <WidgetInfo
            title="Number of DAOs"
            number={general?.dao?.count}
            percentages={general?.dao?.growth}
          />
        </WidgetTile>

        <WidgetTile
          className={styles.widget}
          onClick={() => history.push(routes.generalInfoActiveDao)}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.generalInfoActiveDao,
              exact: true,
            }),
          )}
        >
          <WidgetInfo
            title="Active DAOs"
            number={general?.activity?.count}
            percentages={general?.activity?.growth}
          />
        </WidgetTile>

        <WidgetTile
          className={styles.widget}
          onClick={() => history.push(routes.generalInfoGroups)}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.generalInfoGroups,
              exact: true,
            }),
          )}
        >
          <WidgetInfo
            title="Groups"
            number={general?.groups?.count}
            percentages={general?.groups?.growth}
          />
        </WidgetTile>

        <WidgetTile disabled className={styles.widget}>
          <WidgetInfo title="Avg. Groups/DAO" number={0} percentages={0} />
        </WidgetTile>
      </Widgets>

      <div className={styles.mainContent}>
        <Switch>
          <Route exact path={ROUTES.generalInfo} component={NumbersDao} />
          <Route
            exact
            path={ROUTES.generalInfoActiveDao}
            component={ActiveDao}
          />
          <Route exact path={ROUTES.generalInfoGroups} component={Groups} />
        </Switch>
      </div>
    </Page>
  );
};
