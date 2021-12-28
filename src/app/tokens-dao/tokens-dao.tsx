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
import { getTokensDao, selectTokensDaoById } from 'src/app/shared';
import { useAppDispatch, useAppSelector } from 'src/store';

import styles from 'src/styles/page.module.scss';

import { Fts } from './fts';
import { Nfts } from './nfts';

export const TokensDao: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const routes = useRoutes();
  const { contract, dao } = useParams<Params>();
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokensDaoById(dao));

  useEffect(() => {
    (async () => {
      try {
        if (!tokens) {
          await dispatch(getTokensDao({ contract, dao }));
        }
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, [tokens, contract, dispatch, dao]);

  const breadcrumbs = useMemo(
    () => [
      {
        url: routes.tokens,
        name: 'Tokens',
      },
      {
        url: routes.tokensDao,
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
                path: ROUTES.tokensDao,
                exact: true,
              }),
            )}
            onClick={() =>
              history.push(generatePath(ROUTES.tokensDao, { contract, dao }))
            }
          >
            <WidgetInfo
              title="Number of NFTs"
              number={tokens?.nfts?.count}
              percentages={tokens?.nfts?.growth}
            />
          </WidgetTile>
          <WidgetTile
            className={styles.widget}
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.tokensFtsDao,
                exact: true,
              }),
            )}
            onClick={() =>
              history.push(generatePath(ROUTES.tokensFtsDao, { contract, dao }))
            }
          >
            <WidgetInfo
              title="Number of FTs"
              number={tokens?.fts?.count}
              percentages={tokens?.fts?.growth}
            />
          </WidgetTile>
        </Widgets>

        <div className={styles.mainContent}>
          <Switch>
            <Route exact path={ROUTES.tokensDao} component={Nfts} />
            <Route path={ROUTES.tokensFtsDao} component={Fts} />
          </Switch>
        </div>
      </Page>
    </>
  );
};
