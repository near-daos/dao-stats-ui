import React, { FC } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import { ROUTES } from 'src/constants';

import { Page, WidgetTile, WidgetInfo, ChartPie } from '../../components';

import { pieData } from '../../components/charts/rechartsData';

import styles from './activity.module.scss';
import { NumberOfProposals } from './number-of-proposals';
import { ProposalsType } from './proposals-type';
import { Vote } from './vote';

export const Activity: FC = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Page title="Activity">
      <div className={styles.widgets}>
        <WidgetTile
          short
          className={styles.widget}
          active={location.pathname === ROUTES.activity}
          onClick={() => history.push(ROUTES.activity)}
        >
          <WidgetInfo
            title="Number of Proposals"
            number="456"
            percentages={10}
          />
        </WidgetTile>
        <WidgetTile
          className={styles.widget}
          active={location.pathname === ROUTES.activityProposalsByType}
          onClick={() => history.push(ROUTES.activityProposalsByType)}
        >
          <ChartPie data={pieData[0]} title="Proposals by type" />
        </WidgetTile>
        <WidgetTile
          short
          className={styles.widget}
          active={location.pathname === ROUTES.activityVote}
          onClick={() => history.push(ROUTES.activityVote)}
        >
          <WidgetInfo title="Vote through rate" number="456" percentages={10} />
        </WidgetTile>
      </div>

      <div className={styles.mainContent}>
        <Switch>
          <Route exact path={ROUTES.activity} component={NumberOfProposals} />
          <Route
            path={ROUTES.activityProposalsByType}
            component={ProposalsType}
          />
          <Route exact path={ROUTES.activityVote} component={Vote} />
        </Switch>
      </div>
    </Page>
  );
};
