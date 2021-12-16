import React, { FC, useEffect } from 'react';
import { useLocation, useParams, useHistory, matchPath } from 'react-router';

import { getGeneralDao } from 'src/app/shared/general/slice';
import { selectGeneralDao } from 'src/app/shared/general/selectors';
import { Page, WidgetTile, WidgetInfo, Widgets } from 'src/components';
import { useRoutes } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { ROUTES } from 'src/constants';

import styles from 'src/styles/page.module.scss';

export const GeneralInfoDao: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const routes = useRoutes();
  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const generalDao = useAppSelector(selectGeneralDao);

  useEffect(() => {
    (async () => {
      try {
        if (!generalDao) {
          await dispatch(getGeneralDao({ contract, dao: 'sputnik-dao.near' }));
        }
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, [generalDao, contract, dispatch]);

  return (
    <Page title="General info Dao">
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
            title="Dao activity"
            number={generalDao?.dao?.count}
            percentages={generalDao?.dao?.growth}
          />
        </WidgetTile>
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
            title="Groups"
            number={generalDao?.groups?.count}
            percentages={generalDao?.groups?.growth}
          />
        </WidgetTile>
      </Widgets>
    </Page>
  );
};
