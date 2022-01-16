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
import { FtsVl } from './fts-vl';

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
              title="Number of FTs"
              number={tokens?.fts?.count}
              percentages={tokens?.fts?.growth}
            />
          </WidgetTile>
          <WidgetTile
            className={styles.widget}
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.tokensFtsVlDao,
                exact: true,
              }),
            )}
            onClick={() =>
              history.push(
                generatePath(ROUTES.tokensFtsVlDao, { contract, dao }),
              )
            }
          >
            <WidgetInfo
              title="VL of FTs"
              number={tokens?.ftsVl?.count}
              percentages={tokens?.ftsVl?.growth}
              isRoundNumber
              isCurrency
            />
          </WidgetTile>
          <WidgetTile
            className={styles.widget}
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.tokensNftsDao,
                exact: true,
              }),
            )}
            onClick={() =>
              history.push(
                generatePath(ROUTES.tokensNftsDao, { contract, dao }),
              )
            }
          >
            <WidgetInfo
              title="Number of NFTs"
              number={tokens?.nfts?.count}
              percentages={tokens?.nfts?.growth}
            />
          </WidgetTile>
        </Widgets>

        <div className={styles.mainContent}>
          <Switch>
            <Route exact path={ROUTES.tokensDao} component={Fts} />
            <Route exact path={ROUTES.tokensFtsVlDao} component={FtsVl} />
            <Route exact path={ROUTES.tokensNftsDao} component={Nfts} />
          </Switch>
        </div>
      </Page>
    </>
  );
};
