import { useLocation } from 'react-router';

import {
  HEADER_FORBIDDEN_ROUTES,
  SIDEBAR_FORBIDDEN_ROUTES,
  FOOTER_FORBIDDEN_ROUTES,
} from '../constants';

export const useForbiddenRoutes = (): {
  isForbiddenHeader: boolean;
  isForbiddenSidebar: boolean;
  isForbiddenFooter: boolean;
} => {
  const location = useLocation();

  return {
    isForbiddenHeader: HEADER_FORBIDDEN_ROUTES.includes(location.pathname),
    isForbiddenSidebar: SIDEBAR_FORBIDDEN_ROUTES.includes(location.pathname),
    isForbiddenFooter: FOOTER_FORBIDDEN_ROUTES.includes(location.pathname),
  };
};
