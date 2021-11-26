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
  activityProposalsByType: '/activity/proposals-by-type',
  activityVote: '/activity/vote',
  flow: '/flow',
  flowTransactions: '/flow/transactions',
  tvl: '/tvl',
  tvlBounties: '/tvl/bounties',
  tvlNear: '/tvl/near',
  tvlDao: '/tvl/dao',
  tokens: '/tokens',
  tokensNumberOfFTs: '/tokens/fts',
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
