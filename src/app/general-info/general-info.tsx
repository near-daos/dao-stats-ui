import React, { FC, useEffect, useMemo } from 'react';
import {
  Switch,
  Route,
  useLocation,
  useParams,
  useHistory,
  matchPath,
} from 'react-router';

import { getGeneral } from 'src/app/shared/general/slice';
import { selectGeneral } from 'src/app/shared/general/selectors';
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

import { ActiveDao } from './active-dao';
import { NumbersDao } from './numbers-dao';
import { Groups } from './groups';
import { AverageGroups } from './average-groups';

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
        console.error(error);
      }
    })();
  }, [general, contract, dispatch]);

  const breadcrumbs = useMemo(
    () => [
      {
        url: routes.generalInfo,
        name: 'General Info',
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

          <WidgetTile
            className={styles.widget}
            onClick={() => history.push(routes.generalInfoAverageGroups)}
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.generalInfoAverageGroups,
                exact: true,
              }),
            )}
          >
            <WidgetInfo
              isRoundNumber
              title="Avg. Groups/DAO"
              number={general?.averageGroups?.count}
              percentages={general?.averageGroups?.growth}
            />
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
            <Route
              exact
              path={ROUTES.generalInfoAverageGroups}
              component={AverageGroups}
            />
          </Switch>
        </div>
      </Page>
    </>
  );
};
