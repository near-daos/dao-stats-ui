import { createBrowserHistory } from 'history';
import {
  connectRouter,
  routerMiddleware as createRouterMiddleware,
} from 'connected-react-router';

const history = createBrowserHistory();

const routerReducer = connectRouter(history);
const routerMiddleware = createRouterMiddleware(history);

export { history, routerReducer, routerMiddleware };
