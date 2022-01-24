import React, { FC } from 'react';
import { useMount } from 'react-use';

import {
  generatePath,
  matchPath,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from 'react-router';
import { ROUTES, UrlParams } from 'src/constants';
import { useRoutes } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  Page,
  WidgetTile,
  WidgetInfo,
  ChartPie,
  Widgets,
} from 'src/components';
import { selectGovernanceDaoById } from 'src/app/shared/governance/selectors';
import { getGovernanceDao } from 'src/app/shared/governance/slice';
import styles from 'src/styles/page.module.scss';

import { NumberOfProposals } from './number-of-proposals';
import { ProposalsType } from './proposals-type';
import { VoteRate } from './vote-rate';

export const GovernanceDao: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { contract, dao } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const governance = useAppSelector(selectGovernanceDaoById(dao));

  useMount(() => {
    dispatch(getGovernanceDao({ contract, dao })).catch((err) =>
      console.error(err),
    );
  });

  return (
    <Page title="Governance">
      <Widgets>
        <WidgetTile
          className={styles.widget}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.governanceDao,
              exact: true,
            }),
          )}
          onClick={() =>
            history.push(generatePath(ROUTES.governanceDao, { contract, dao }))
          }
        >
          <WidgetInfo
            title="Number of Proposals"
            number={governance?.proposals?.count}
            percentages={governance?.proposals?.growth}
          />
        </WidgetTile>
        <WidgetTile
          className={styles.widget}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.governanceVoteRateDao,
              exact: true,
            }),
          )}
          onClick={() =>
            history.push(
              generatePath(ROUTES.governanceVoteRateDao, { contract, dao }),
            )
          }
        >
          <WidgetInfo
            title="Vote through rate"
            number={governance?.voteRate?.count}
            isPercentage
            percentages={governance?.voteRate?.growth}
          />
        </WidgetTile>
        <WidgetTile
          className={styles.widget}
          active={Boolean(
            matchPath(location.pathname, {
              path: ROUTES.governanceProposalTypeDao,
              exact: true,
            }),
          )}
          onClick={() =>
            history.push(
              generatePath(ROUTES.governanceProposalTypeDao, {
                contract,
                dao,
              }),
            )
          }
        >
          <ChartPie
            data={governance?.proposalsByType}
            title="Proposals by type"
          />
        </WidgetTile>
      </Widgets>

      <div className={styles.mainContent}>
        <Switch>
          <Route
            exact
            path={ROUTES.governanceDao}
            component={NumberOfProposals}
          />
          <Route
            path={ROUTES.governanceProposalTypeDao}
            component={ProposalsType}
          />
          <Route
            exact
            path={ROUTES.governanceVoteRateDao}
            component={VoteRate}
          />
        </Switch>
      </div>
    </Page>
  );
};
