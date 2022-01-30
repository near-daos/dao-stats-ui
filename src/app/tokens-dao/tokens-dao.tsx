import React, { FC } from 'react';
import {
  generatePath,
  matchPath,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from 'react-router';
import { useMount } from 'react-use';
import { UrlParams, ROUTES } from 'src/constants';

import { Page, WidgetTile, WidgetInfo, Widgets } from 'src/components';
import { getTokensDao, selectTokensDaoById } from 'src/app/shared';
import { useAppDispatch, useAppSelector } from 'src/store';

import styles from 'src/styles/page.module.scss';

import { Fts } from './fts';
import { Nfts } from './nfts';
import { FtsVl } from './fts-vl';

export const TokensDao: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokensDaoById(dao));

  useMount(() => {
    if (!tokens) {
      dispatch(getTokensDao({ contract, dao })).catch((err) =>
        console.error(err),
      );
    }
  });

  return (
    <Page title="Tokens">
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
            history.push(generatePath(ROUTES.tokensFtsVlDao, { contract, dao }))
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
            history.push(generatePath(ROUTES.tokensNftsDao, { contract, dao }))
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
  );
};
