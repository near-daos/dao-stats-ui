import React, { FC, useEffect, useMemo } from 'react';
import {
  matchPath,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from 'react-router';
import { ROUTES } from 'src/constants';
import { useRoutes } from 'src/hooks';

import {
  Page,
  WidgetTile,
  WidgetInfo,
  Breadcrumbs,
  Widgets,
} from 'src/components';
import { getTokens, selectTokens } from 'src/app/shared';
import { useAppDispatch, useAppSelector } from 'src/store';

import styles from 'src/styles/page.module.scss';

import { Fts } from './fts';
import { Nfts } from './nfts';

export const Tokens: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const routes = useRoutes();
  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokens);

  useEffect(() => {
    (async () => {
      try {
        if (!tokens) {
          await dispatch(getTokens({ contract }));
        }
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, [tokens, contract, dispatch]);

  const breadcrumbs = useMemo(
    () => [
      {
        url: routes.tokens,
        name: 'Tokens',
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
                path: ROUTES.tokens,
                exact: true,
              }),
            )}
            onClick={() => history.push(routes.tokens)}
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
                path: ROUTES.tokensFts,
                exact: true,
              }),
            )}
            onClick={() => history.push(routes.tokensFts)}
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
            <Route exact path={ROUTES.tokens} component={Nfts} />
            <Route path={ROUTES.tokensFts} component={Fts} />
          </Switch>
        </div>
      </Page>
    </>
  );
};
