import React, { FC, useEffect, useMemo } from 'react';
import {
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
import {
  getTokens,
  selectTokens,
  selectSelectedContract,
} from 'src/app/shared';
import { useAppDispatch, useAppSelector } from 'src/store';

import styles from 'src/styles/page.module.scss';

import { Fts } from './fts';
import { Nfts } from './nfts';
import { FtsVl } from './fts-vl';

import { isTestnet } from '../../utils/network';

export const Tokens: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const routes = useRoutes();
  const { contract } = useParams<Params>();
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokens);
  const selectedContract = useAppSelector(selectSelectedContract);

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
              title="Number of FTs"
              number={tokens?.fts?.count}
              percentages={tokens?.fts?.growth}
            />
          </WidgetTile>
          {!isTestnet(selectedContract) ? (
            <WidgetTile
              className={styles.widget}
              active={Boolean(
                matchPath(location.pathname, {
                  path: ROUTES.tokensFtsVl,
                  exact: true,
                }),
              )}
              onClick={() => history.push(routes.tokensFtsVl)}
            >
              <WidgetInfo
                title="VL of FTs"
                isRoundNumber
                number={tokens?.ftsVl?.count}
                percentages={tokens?.ftsVl?.growth}
                isCurrency
              />
            </WidgetTile>
          ) : null}
          <WidgetTile
            className={styles.widget}
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.tokensNfts,
                exact: true,
              }),
            )}
            onClick={() => history.push(routes.tokensNfts)}
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
            <Route exact path={ROUTES.tokens} component={Fts} />
            <Route path={ROUTES.tokensFtsVl} component={FtsVl} />
            <Route path={ROUTES.tokensNfts} component={Nfts} />
          </Switch>
        </div>
      </Page>
    </>
  );
};
