import React, { FC, useEffect, useMemo } from 'react';
import {
  generatePath,
  matchPath,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from 'react-router';
import { Params, ROUTES } from 'src/constants';
import { useRoutes } from 'src/hooks';

import {
  Page,
  WidgetTile,
  WidgetInfo,
  Breadcrumbs,
  Widgets,
} from 'src/components';
import { getTvlDao, selectTvlDaoById } from 'src/app/shared';
import { useAppDispatch, useAppSelector } from 'src/store';

import styles from 'src/styles/page.module.scss';

import { BountiesNumber } from './bounties-number';
import { BountiesVl } from './bounties-vl';

export const TvlDao: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const routes = useRoutes();
  const { contract, dao } = useParams<Params>();
  const dispatch = useAppDispatch();
  const tvl = useAppSelector(selectTvlDaoById(dao));

  useEffect(() => {
    dispatch(getTvlDao({ contract, dao })).catch((error: unknown) => {
      console.error(error);
    });
  }, [contract, dispatch, dao]);

  const breadcrumbs = useMemo(
    () => [
      {
        url: routes.tvl,
        name: 'TVL',
      },
      {
        url: routes.tvlDao,
        name: dao,
      },
    ],
    [routes, dao],
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
                path: ROUTES.tvlDao,
                exact: true,
              }),
            )}
            onClick={() =>
              history.push(generatePath(ROUTES.tvlDao, { contract, dao }))
            }
          >
            <WidgetInfo
              isRoundNumber
              title="Number of Bounties"
              number={tvl?.bounties?.number?.count}
              percentages={tvl?.bounties?.number?.growth}
            />
          </WidgetTile>
          <WidgetTile
            className={styles.widget}
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.tvlDaoBountyVl,
                exact: true,
              }),
            )}
            onClick={() =>
              history.push(
                generatePath(ROUTES.tvlDaoBountyVl, { contract, dao }),
              )
            }
          >
            <WidgetInfo
              isCurrency
              isRoundNumber
              title="VL of Bounties"
              number={tvl?.bounties?.vl?.count}
              percentages={tvl?.bounties?.vl?.growth}
            />
          </WidgetTile>
          {/*  <WidgetTile className={styles.widget}>
            <WidgetInfo
              isRoundNumber
              title="Number of Grants"
              number={tvl?.grants?.number?.count}
              percentages={tvl?.grants?.number?.growth}
            />
            <WidgetInfo
              isCurrency
              isRoundNumber
              title="VL of Grants"
              number={tvl?.grants?.vl?.count}
              percentages={tvl?.grants?.vl?.growth}
            />
          </WidgetTile> */}
          <WidgetTile className={styles.widget}>
            <WidgetInfo
              isCurrency
              isRoundNumber
              title="TVL"
              number={tvl?.tvl?.count}
              percentages={tvl?.tvl?.growth}
            />
          </WidgetTile>
        </Widgets>

        <div className={styles.mainContent}>
          <Switch>
            <Route exact path={ROUTES.tvlDao} component={BountiesNumber} />
            <Route path={ROUTES.tvlDaoBountyVl} component={BountiesVl} />
          </Switch>
        </div>
      </Page>
    </>
  );
};
