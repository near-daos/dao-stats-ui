import React, { FC, useMemo } from 'react';
import {
  Switch,
  Route,
  useLocation,
  useParams,
  useHistory,
  matchPath,
} from 'react-router';
import { useMount } from 'react-use';

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
import { ROUTES, UrlParams } from 'src/constants';

import styles from 'src/styles/page.module.scss';

import { ActiveDao } from './active-dao';
import { NumbersDao } from './numbers-dao';
import { Groups } from './groups';
import { AverageGroups } from './average-groups';

export const GeneralInfo: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const routes = useRoutes();
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const general = useAppSelector(selectGeneral);

  useMount(() => {
    if (!general) {
      dispatch(getGeneral({ contract })).catch((err) => console.error(err));
    }
  });

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
            onClick={() => history.push(routes.generalInfo)}
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.generalInfo,
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
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.generalInfoDaoCount,
                exact: true,
              }),
            )}
            onClick={() => history.push(routes.generalInfoDaoCount)}
          >
            <WidgetInfo
              title="Number of DAOs"
              number={general?.dao?.count}
              percentages={general?.dao?.growth}
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
              title="Avg. Groups/DAO"
              number={general?.averageGroups?.count}
              percentages={general?.averageGroups?.growth}
            />
          </WidgetTile>
        </Widgets>

        <div className={styles.mainContent}>
          <Switch>
            <Route exact path={ROUTES.generalInfo} component={ActiveDao} />
            <Route
              exact
              path={ROUTES.generalInfoDaoCount}
              component={NumbersDao}
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
