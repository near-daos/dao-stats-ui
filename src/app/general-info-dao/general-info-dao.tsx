import React, { FC } from 'react';
import {
  useLocation,
  useParams,
  useHistory,
  matchPath,
  Switch,
  Route,
  generatePath,
} from 'react-router';
import { useMount } from 'react-use';

import { getGeneralDao } from 'src/app/shared/general/slice';
import { selectGeneralDaoById } from 'src/app/shared/general/selectors';
import { Page, WidgetTile, WidgetInfo, Widgets } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/store';
import { ROUTES, UrlParams } from 'src/constants';
import styles from 'src/styles/page.module.scss';

import { Groups } from './groups';
import { Activity } from './activity';

export const GeneralInfoDao: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { contract, dao } = useParams<UrlParams>();

  const dispatch = useAppDispatch();
  const generalDao = useAppSelector(selectGeneralDaoById(dao));

  useMount(() => {
    if (!generalDao) {
      dispatch(getGeneralDao({ contract, dao })).catch((error: unknown) => {
        console.error(error);
      });
    }
  });

  return (
    <Page title="General Info">
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
            history.push(generatePath(ROUTES.generalInfoDao, { contract, dao }))
          }
        >
          <WidgetInfo
            title="Activity"
            number={generalDao?.activity?.count}
            percentages={generalDao?.activity?.growth}
          />
        </WidgetTile>
        <WidgetTile
          className={styles.widget}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.generalInfoDaoGroups,
              exact: true,
            }),
          )}
          onClick={() =>
            history.push(
              generatePath(ROUTES.generalInfoDaoGroups, { contract, dao }),
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
          <Route exact path={ROUTES.generalInfoDao} component={Activity} />
          <Route exact path={ROUTES.generalInfoDaoGroups} component={Groups} />
        </Switch>
      </div>
    </Page>
  );
};
