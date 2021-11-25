export const ROUTES = {
  index: '/',
  uiKit: '/ui-kit',
  page404: '/404',
  generalInfo: '/general-info',
  generalInfoDaoActivity: '/general-info/dao-activity',
  generalInfoGroups: '/general-info/groups',
  users: '/users',
  usersAverageCouncilSize: '/users/average-council-size',
  usersNumberOfInteractions: '/users/number-of-interactions',
  activity: '/activity',
  flow: '/flow',
  tvl: '/tvl',
  tokens: '/tokens',
};

export const HEADER_FORBIDDEN_ROUTES = [
  ROUTES.index,
  ROUTES.page404,
  ROUTES.uiKit,
];
export const SIDEBAR_FORBIDDEN_ROUTES = [
  ROUTES.index,
  ROUTES.page404,
  ROUTES.uiKit,
];
