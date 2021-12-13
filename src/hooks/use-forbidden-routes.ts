import { useLocation } from 'react-router';

import {
  HEADER_FORBIDDEN_ROUTES,
  SIDEBAR_FORBIDDEN_ROUTES,
} from '../constants';

export const useForbiddenRoutes = (): {
  isForbiddenHeader: boolean;
  isForbiddenSidebar: boolean;
} => {
  const location = useLocation();

  return {
    isForbiddenHeader: HEADER_FORBIDDEN_ROUTES.includes(location.pathname),
    isForbiddenSidebar: SIDEBAR_FORBIDDEN_ROUTES.includes(location.pathname),
  };
};
