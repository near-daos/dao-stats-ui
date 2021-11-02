import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import { history } from '../../store/history';
import { store } from '../../store';
import { ROUTES } from '../../constants';
import { Layout } from '../../components';
import { UiKIt } from '..';

export const App: FC = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <Route exact path={ROUTES.index} component={UiKIt} />
          <Route exact path={ROUTES.uiKit} component={UiKIt} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  </Provider>
);

export default App;
