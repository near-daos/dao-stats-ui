import React, { FC } from 'react';
import { useMount } from 'react-use';
import {
  matchPath,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from 'react-router';
import { ROUTES, UrlParams } from 'src/constants';
import { Page, WidgetTile, WidgetInfo, Widgets } from 'src/components';

import { useRoutes } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getTvl, selectTvl } from 'src/app/shared';
import styles from 'src/styles/page.module.scss';

import { TvlHistory } from './tvl-history';
import { BountiesAndGrantsVl } from './bounties-and-grants-vl';

export const Tvl: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const routes = useRoutes();
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const tvl = useAppSelector(selectTvl);

  useMount(() => {
    if (!tvl) {
      dispatch(getTvl({ contract })).catch((err) => console.error(err));
    }
  });

  return (
    <Page title="TVL">
      <Widgets>
        <WidgetTile
          className={styles.widget}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.tvl,
              exact: true,
            }),
          )}
          onClick={() => history.push(routes.tvl)}
        >
          <WidgetInfo
            isCurrency
            isRoundNumber
            title="Platform TVL"
            number={tvl?.tvl?.count}
            percentages={tvl?.tvl?.growth}
          />
        </WidgetTile>

        <WidgetTile
          className={styles.widget}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.tvlBountiesAndGrantsVl,
              exact: true,
            }),
          )}
          onClick={() => history.push(routes.tvlBountiesAndGrantsVl)}
        >
          <WidgetInfo
            isCurrency
            isRoundNumber
            title="VL in Bounties/Grants"
            number={tvl?.bountiesAndGrantsVl?.count}
            percentages={tvl?.bountiesAndGrantsVl?.growth}
          />
        </WidgetTile>

        {/* <WidgetTile className={styles.widget}>
            <WidgetInfo
              isCurrency
              isRoundNumber
              title="Fungible TVL"
              number={tvl?.ftsVl?.count}
              percentages={tvl?.ftsVl?.growth}
            />
          </WidgetTile> */}
      </Widgets>
      <div className={styles.mainContent}>
        <Switch>
          <Route exact path={ROUTES.tvl} component={TvlHistory} />
          <Route
            path={ROUTES.tvlBountiesAndGrantsVl}
            component={BountiesAndGrantsVl}
          />
        </Switch>
      </div>
    </Page>
  );
};
