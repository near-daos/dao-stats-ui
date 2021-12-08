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
  Activity,
  Flow,
  Tvl,
  Tokens,
} from '..';
import { Layout, Loading, UserData } from '../../components';
import { RequestStatus } from '../../store/types';

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
                  path={ROUTES.generalInfoDaoActivity}
                  component={GeneralInfo}
                />
                <Route
                  exact
                  path={ROUTES.generalInfoGroups}
                  component={GeneralInfo}
                />
                <Route exact path={ROUTES.users} component={Users} />
                <Route
                  exact
                  path={ROUTES.usersAverageCouncilSize}
                  component={Users}
                />
                <Route
                  exact
                  path={ROUTES.usersNumberInteractions}
                  component={Users}
                />
                <Route exact path={ROUTES.activity} component={Activity} />
                <Route
                  exact
                  path={ROUTES.activityProposalType}
                  component={Activity}
                />
                <Route
                  exact
                  path={ROUTES.activityVoteRate}
                  component={Activity}
                />
                <Route exact path={ROUTES.flow} component={Flow} />
                <Route exact path={ROUTES.flowTransactions} component={Flow} />
                <Route exact path={ROUTES.tvl} component={Tvl} />
                <Route exact path={ROUTES.tvlBounties} component={Tvl} />
                <Route exact path={ROUTES.tvlNear} component={Tvl} />
                <Route exact path={ROUTES.tvlDao} component={Tvl} />
                <Route exact path={ROUTES.tokens} component={Tokens} />
                <Route exact path={ROUTES.tokensNumberFt} component={Tokens} />
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
