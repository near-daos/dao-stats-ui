import React, { FC, useEffect } from 'react';
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from 'react-router';
import { ROUTES } from 'src/constants';
import { useRoutes } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import { Page, WidgetTile, WidgetInfo, ChartPie } from 'src/components';

import { NumberOfProposals } from './number-of-proposals';
import { ProposalsType } from './proposals-type';
import { Vote } from './vote';

import { selectActivity } from './selectors';
import { getActivity } from './slice';

import styles from './activity.module.scss';

export const Activity: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const routes = useRoutes();
  const { contract } = useParams<{ contract: string }>();
  const dispatch = useAppDispatch();
  const activity = useAppSelector(selectActivity);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getActivity({ contract }));
      } catch (error: unknown) {
        console.error(error);
      }
    })();
  }, [contract, dispatch]);

  return (
    <Page title="Activity">
      <div className={styles.widgets}>
        <WidgetTile
          short
          className={styles.widget}
          active={location.pathname === routes.activity}
          onClick={() => history.push(routes.activity)}
        >
          <WidgetInfo
            title="Number of Proposals"
            number={activity?.proposals.count}
            percentages={activity?.proposals.growth}
          />
        </WidgetTile>
        <WidgetTile
          short
          className={styles.widget}
          active={location.pathname === routes.activityVoteRate}
          onClick={() => history.push(routes.activityVoteRate)}
        >
          <WidgetInfo
            title="Vote through rate"
            number={activity?.voteRate.count}
            percentages={activity?.voteRate.growth}
          />
        </WidgetTile>
        <WidgetTile
          className={styles.widget}
          active={location.pathname === routes.activityProposalType}
          onClick={() => history.push(routes.activityProposalType)}
        >
          <ChartPie
            data={activity?.proposalsByType}
            title="Proposals by type"
          />
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
