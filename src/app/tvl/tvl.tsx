import React, { FC } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import { ROUTES } from 'src/constants';

import { Page, WidgetTile, WidgetInfo } from '../../components';
import { TVLBounties } from './bounties';
import { TVLGrants } from './grants';
import { TVLDao } from './tvl-dao';
import { TVLNear } from './tvl-near';

import styles from './tvl.module.scss';

export const Tvl: FC = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Page title="TVL">
      <div className={styles.widgets}>
        <WidgetTile
          short
          className={styles.widget}
          active={location.pathname === ROUTES.tvl}
          onClick={() => history.push(ROUTES.tvl)}
        >
          <WidgetInfo
            title="Number of Grants"
            number={2290}
            percentages={10}
            className={styles.info}
          />
          <WidgetInfo
            title="VL of Grants"
            number={2290999999}
            percentages={10}
          />
        </WidgetTile>
        <WidgetTile
          short
          className={styles.widget}
          active={location.pathname === ROUTES.tvlBounties}
          onClick={() => history.push(ROUTES.tvlBounties)}
        >
          <WidgetInfo
            title="Number of Bounties"
            number={16193}
            percentages={10}
            className={styles.info}
          />
          <WidgetInfo title="VL of Bounties" number={456} percentages={10} />
        </WidgetTile>
        <WidgetTile
          short
          className={styles.widget}
          active={location.pathname === ROUTES.tvlNear}
          onClick={() => history.push(ROUTES.tvlNear)}
        >
          <WidgetInfo title="TVL (NEAR)" number={16.193} percentages={10} />
        </WidgetTile>
        <WidgetTile
          short
          className={styles.widget}
          active={location.pathname === ROUTES.tvlDao}
          onClick={() => history.push(ROUTES.tvlDao)}
        >
          <WidgetInfo title="TVL per DAO" number={16.193} percentages={10} />
        </WidgetTile>
      </div>

      <div className={styles.mainContent}>
        <Switch>
          <Route exact path={ROUTES.tvl} component={TVLGrants} />
          <Route path={ROUTES.tvlBounties} component={TVLBounties} />
          <Route path={ROUTES.tvlNear} component={TVLNear} />
          <Route path={ROUTES.tvlDao} component={TVLDao} />
        </Switch>
      </div>
    </Page>
  );
};
