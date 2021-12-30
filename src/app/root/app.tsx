import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import { history } from '../../store/history';
import { store } from '../../store';
import { ROUTES } from '../../constants';

import styles from './app.module.scss';

import {
  UiKIt,
  Page404,
  MainPage,
  GeneralInfo,
  Users,
  Governance,
  Flow,
  Tvl,
  TvlDao,
  Tokens,
  GeneralInfoDao,
  UsersDao,
  GovernanceDao,
} from '..';
import { Layout, Loading, UserData } from '../../components';
import { RequestStatus } from '../../store/types';
import { TokensDao } from '../tokens-dao';

export const App: FC = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <UserData>
        {(loadingContracts) => {
          if (
            loadingContracts === RequestStatus.PENDING ||
            loadingContracts === RequestStatus.NOT_ASKED
          ) {
            return <Loading className={styles.loading} />;
          }

          return (
            <Layout>
              <Switch>
                <Route exact path={ROUTES.index} component={MainPage} />
                <Route
                  exact
                  path={ROUTES.generalInfo}
                  component={GeneralInfo}
                />
                <Route
                  exact
                  path={ROUTES.generalInfoActiveDao}
                  component={GeneralInfo}
                />
                <Route
                  exact
                  path={ROUTES.generalInfoGroups}
                  component={GeneralInfo}
                />
                <Route
                  exact
                  path={ROUTES.generalInfoAverageGroups}
                  component={GeneralInfo}
                />
                <Route
                  exact
                  path={ROUTES.generalInfoDao}
                  component={GeneralInfoDao}
                />
                <Route
                  exact
                  path={ROUTES.generalInfoDaoGroups}
                  component={GeneralInfoDao}
                />
                <Route exact path={ROUTES.users} component={Users} />
                <Route exact path={ROUTES.usersMembers} component={Users} />
                <Route
                  exact
                  path={ROUTES.usersAverageUsers}
                  component={Users}
                />
                <Route
                  exact
                  path={ROUTES.usersInteractions}
                  component={Users}
                />
                <Route
                  exact
                  path={ROUTES.usersAverageInteractions}
                  component={Users}
                />

                <Route exact path={ROUTES.usersDao} component={UsersDao} />
                <Route
                  exact
                  path={ROUTES.usersMembersDao}
                  component={UsersDao}
                />
                <Route
                  exact
                  path={ROUTES.usersInteractionsDao}
                  component={UsersDao}
                />

                <Route exact path={ROUTES.governance} component={Governance} />
                <Route
                  exact
                  path={ROUTES.governanceProposalType}
                  component={Governance}
                />
                <Route
                  exact
                  path={ROUTES.governanceVoteRate}
                  component={Governance}
                />

                <Route
                  exact
                  path={ROUTES.governanceDao}
                  component={GovernanceDao}
                />
                <Route
                  exact
                  path={ROUTES.governanceProposalTypeDao}
                  component={GovernanceDao}
                />
                <Route
                  exact
                  path={ROUTES.governanceVoteRateDao}
                  component={GovernanceDao}
                />

                <Route exact path={ROUTES.flow} component={Flow} />
                <Route exact path={ROUTES.flowTransactions} component={Flow} />
                <Route exact path={ROUTES.tvl} component={Tvl} />
                <Route exact path={ROUTES.tvlAvgTvl} component={Tvl} />
                <Route
                  exact
                  path={ROUTES.tvlBountiesAndGrantsVl}
                  component={Tvl}
                />
                <Route exact path={ROUTES.tvlDao} component={TvlDao} />
                <Route exact path={ROUTES.tvlDaoBountyVl} component={TvlDao} />
                <Route exact path={ROUTES.tokens} component={Tokens} />
                <Route exact path={ROUTES.tokensFtsVl} component={Tokens} />
                <Route exact path={ROUTES.tokensNfts} component={Tokens} />
                <Route exact path={ROUTES.tokensDao} component={TokensDao} />
                <Route
                  exact
                  path={ROUTES.tokensFtsVlDao}
                  component={TokensDao}
                />
                <Route
                  exact
                  path={ROUTES.tokensNftsDao}
                  component={TokensDao}
                />
                <Route exact path={ROUTES.page404} component={Page404} />
                <Route exact path={ROUTES.uiKit} component={UiKIt} />
                <Redirect to={ROUTES.page404} />
              </Switch>
            </Layout>
          );
        }}
      </UserData>
    </ConnectedRouter>
  </Provider>
);

export default App;
