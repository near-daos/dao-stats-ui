import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import { history } from '../../store/history';
import { store } from '../../store';
import { ROUTES } from '../../constants';
import { Layout } from '../../components';
import { UiKIt, Page404, MainPage, GeneralInfo } from '..';

export const App: FC = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path={ROUTES.index} component={MainPage} />
        <Route exact path={ROUTES.page404} component={Page404} />
        <Route exact path={ROUTES.uiKit} component={UiKIt} />
        <Layout>
          <Route exact path={ROUTES.generalInfo} component={GeneralInfo} />
        </Layout>
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
