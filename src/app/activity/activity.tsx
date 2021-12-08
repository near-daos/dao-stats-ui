import React, { FC } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import { ROUTES } from 'src/constants';

import { Page, WidgetTile, WidgetInfo, ChartPie } from '../../components';

import { pieData } from '../../components/charts/rechartsData';

import { NumberOfProposals } from './number-of-proposals';
import { ProposalsType } from './proposals-type';
import { Vote } from './vote';

import styles from './activity.module.scss';

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
            number={456}
            percentages={10}
          />
        </WidgetTile>
        <WidgetTile
          className={styles.widget}
          active={location.pathname === ROUTES.activityProposalType}
          onClick={() => history.push(ROUTES.activityProposalType)}
        >
          <ChartPie data={pieData[0]} title="Proposals by type" />
        </WidgetTile>
        <WidgetTile
          short
          className={styles.widget}
          active={location.pathname === ROUTES.activityVoteRate}
          onClick={() => history.push(ROUTES.activityVoteRate)}
        >
          <WidgetInfo title="Vote through rate" number={456} percentages={10} />
        </WidgetTile>
      </div>

      <div className={styles.mainContent}>
        <Switch>
          <Route exact path={ROUTES.activity} component={NumberOfProposals} />
          <Route path={ROUTES.activityProposalType} component={ProposalsType} />
          <Route exact path={ROUTES.activityVoteRate} component={Vote} />
        </Switch>
      </div>
    </Page>
  );
};
