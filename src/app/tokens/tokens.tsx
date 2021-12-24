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

import { Page, WidgetTile, WidgetInfo, Breadcrumbs } from '../../components';
import { TokensNumberOfFTs } from './number-of-fts';
import { TokensNumberOfNFTs } from './number-of-nfts';

import styles from './tokens.module.scss';
import { getGeneral, selectGeneral } from '../shared';
import { useRoutes } from '../../hooks';
import { useAppDispatch, useAppSelector } from '../../store';

export const Tokens: FC = () => {
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
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, [general, contract, dispatch]);

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
        <div className={styles.widgets}>
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
              number={13290}
              percentages={10}
            />
          </WidgetTile>
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
            <WidgetInfo title="Number of FTs" number={16193} percentages={10} />
          </WidgetTile>
        </div>

        <div className={styles.mainContent}>
          <Switch>
            <Route exact path={ROUTES.tokens} component={TokensNumberOfNFTs} />
            <Route path={ROUTES.tokensNumberFt} component={TokensNumberOfFTs} />
          </Switch>
        </div>
      </Page>
    </>
  );
};
