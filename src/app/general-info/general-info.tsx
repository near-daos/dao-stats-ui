import React, { FC, useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation,
  useParams,
  useHistory,
} from 'react-router';

import { Page, WidgetTile, WidgetInfo, Widgets } from '../../components';
import { DaoActivity } from './dao-activity';
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
        console.error(error);
      }
    })();
  }, [general, contract, dispatch]);

  return (
    <Page title="General info">
      <Widgets>
        <WidgetTile
          className={styles.widget}
          active={location.pathname === routes.generalInfo}
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
          onClick={() => history.push(routes.generalInfoDaoActivity)}
          active={location.pathname === routes.generalInfoDaoActivity}
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
          active={location.pathname === routes.generalInfoGroups}
        >
          <WidgetInfo
            title="Groups"
            number={general?.groups?.count}
            percentages={general?.groups?.growth}
          />
        </WidgetTile>

        <WidgetTile
          disabled
          className={styles.widget}
          onClick={() => history.push(routes.generalInfoDaoActivity)}
          active={location.pathname === routes.generalInfoDaoActivity}
        >
          <WidgetInfo
            title="Avg. Groups/DAO"
            number={general?.activity?.count}
            percentages={general?.activity?.growth}
          />
        </WidgetTile>
      </Widgets>

      <div className={styles.mainContent}>
        <Switch>
          <Route exact path={ROUTES.generalInfo} component={NumbersDao} />
          <Route
            exact
            path={ROUTES.generalInfoDaoActivity}
            component={DaoActivity}
          />
          <Route exact path={ROUTES.generalInfoGroups} component={Groups} />
        </Switch>
      </div>
    </Page>
  );
};
