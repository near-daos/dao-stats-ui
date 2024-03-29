import React, { FC, useMemo } from 'react';
import { useMount } from 'react-use';
import {
  matchPath,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from 'react-router';
import { UrlParams, ROUTES } from 'src/constants';
import { useRoutes } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  Page,
  WidgetTile,
  WidgetInfo,
  ChartPie,
  Widgets,
  Breadcrumbs,
} from 'src/components';
import { selectGovernance } from 'src/app/shared/governance/selectors';
import { getGovernance } from 'src/app/shared/governance/slice';

import styles from 'src/styles/page.module.scss';

import { NumberOfProposals } from './number-of-proposals';
import { ProposalsType } from './proposals-type';
import { VoteRate } from './vote-rate';

export const Governance: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const routes = useRoutes();
  const { contract } = useParams<UrlParams>();
  const dispatch = useAppDispatch();
  const governance = useAppSelector(selectGovernance);

  useMount(() => {
    if (!governance) {
      dispatch(getGovernance({ contract })).catch((err) => console.error(err));
    }
  });

  const breadcrumbs = useMemo(
    () => [
      {
        url: routes.governance,
        name: 'Governance',
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
                path: ROUTES.governance,
                exact: true,
              }),
            )}
            onClick={() => history.push(routes.governance)}
          >
            <WidgetInfo
              isRoundNumber
              title="Number of Proposals"
              number={governance?.proposals?.count}
              percentages={governance?.proposals?.growth}
            />
          </WidgetTile>
          <WidgetTile
            className={styles.widget}
            active={Boolean(
              matchPath(location.pathname, {
                path: ROUTES.governanceVoteRate,
                exact: true,
              }),
            )}
            onClick={() => history.push(routes.governanceVoteRate)}
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
                path: ROUTES.governanceProposalType,
                exact: true,
              }),
            )}
            onClick={() => history.push(routes.governanceProposalType)}
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
              path={ROUTES.governance}
              component={NumberOfProposals}
            />
            <Route
              path={ROUTES.governanceProposalType}
              component={ProposalsType}
            />
            <Route
              exact
              path={ROUTES.governanceVoteRate}
              component={VoteRate}
            />
          </Switch>
        </div>
      </Page>
    </>
  );
};
