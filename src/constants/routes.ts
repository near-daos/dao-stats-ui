export const ROUTES = {
  index: '/',
  uiKit: '/ui-kit',
  page404: '/404',
  generalInfo: '/general-info',
  generalInfoDaoActivity: '/general-info/dao-activity',
  generalInfoGroups: '/general-info/groups',
  users: '/users',
  usersAverageCouncilSize: '/users/average-council-size',
  usersNumberInteractions: '/users/number-interactions',
  activity: '/activity',
  activityProposalType: '/activity/proposal-type',
  activityVoteRate: '/activity/vote-rate',
  flow: '/flow',
  flowTransactions: '/flow/transactions',
  tvl: '/tvl',
  tvlBounties: '/tvl/bounties',
  tvlNear: '/tvl/near',
  tvlDao: '/tvl/dao',
  tokens: '/tokens',
  tokensFt: '/tokens/ft',
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
