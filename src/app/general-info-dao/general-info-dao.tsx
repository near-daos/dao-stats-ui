import React, { FC, useEffect, useMemo } from 'react';
import {
  useLocation,
  useParams,
  useHistory,
  matchPath,
  Switch,
  Route,
  generatePath,
} from 'react-router';

import { getGeneralDao } from 'src/app/shared/general/slice';
import { selectGeneralDaoById } from 'src/app/shared/general/selectors';
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

import { Groups } from './groups';

export const GeneralInfoDao: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { contract, dao } = useParams<{ dao: string; contract: string }>();
  const routes = useRoutes();

  const dispatch = useAppDispatch();
  const generalDao = useAppSelector(selectGeneralDaoById(dao));

  useEffect(() => {
    if (!generalDao) {
      dispatch(getGeneralDao({ contract, dao })).catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    }
  }, [generalDao, contract, dao, dispatch]);

  const breadcrumbs = useMemo(
    () => [
      {
        url: routes.generalInfo,
        name: 'General Info',
      },
      {
        url: routes.generalInfoDao,
        name: dao,
      },
    ],
    [dao, routes],
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
                path: ROUTES.generalInfoDao,
                exact: true,
              }),
            )}
            onClick={() =>
              history.push(
                generatePath(ROUTES.generalInfoDao, { contract, dao }),
              )
            }
          >
            <WidgetInfo
              title="Groups"
              number={generalDao?.groups?.count}
              percentages={generalDao?.groups?.growth}
            />
          </WidgetTile>
        </Widgets>
        <div className={styles.mainContent}>
          <Switch>
            <Route exact path={ROUTES.generalInfoDao} component={Groups} />
          </Switch>
        </div>
      </Page>
    </>
  );
};
