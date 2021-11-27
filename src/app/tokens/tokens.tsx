import React, { FC } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import { ROUTES } from 'src/constants';

import { Page, WidgetTile, WidgetInfo } from '../../components';
import { TokensNumberOfFTs } from './number-of-fts';
import { TokensNumberOfNFTs } from './number-of-nfts';

import styles from './tokens.module.scss';

export const Tokens: FC = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Page title="Tokens">
      <div className={styles.widgets}>
        <WidgetTile
          className={styles.widget}
          active={location.pathname === ROUTES.tokens}
          onClick={() => history.push(ROUTES.tokens)}
        >
          <WidgetInfo title="Number of NFTs" number="13290" percentages={10} />
          <WidgetInfo title="Number of FTs" number="2290" percentages={10} />
        </WidgetTile>
        <WidgetTile
          className={styles.widget}
          active={location.pathname === ROUTES.tokensNumberFt}
          onClick={() => history.push(ROUTES.tokensNumberFt)}
        >
          <WidgetInfo title="Number of FTs" number="16193" percentages={10} />
          <WidgetInfo title="VL of FTs" number="456" percentages={10} />
        </WidgetTile>
      </div>

      <div className={styles.mainContent}>
        <Switch>
          <Route exact path={ROUTES.tokens} component={TokensNumberOfNFTs} />
          <Route path={ROUTES.tokensNumberFt} component={TokensNumberOfFTs} />
        </Switch>
      </div>
    </Page>
  );
};
