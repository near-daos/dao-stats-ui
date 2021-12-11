export const ROUTES = {
  index: '/',
  uiKit: '/ui-kit',
  page404: '/404',
  generalInfo: '/:contract/general-info',
  generalInfoDaoActivity: '/:contract/general-info/dao-activity',
  generalInfoGroups: '/:contract/general-info/groups',
  users: '/:contract/users',
  usersOfDao: '/:contract/users/of-dao',
  usersPerDao: '/:contract/users/per-dao',
  usersAverageCouncilSize: '/:contract/users/average-council-size',
  usersNumberInteractions: '/:contract/users/number-interactions',
  usersNumberInteractionsPerDao: '/:contract/users/number-interactions-per-dao',
  activity: '/:contract/activity',
  activityProposalType: '/:contract/activity/proposal-type',
  activityVoteRate: '/:contract/activity/vote-rate',
  flow: '/:contract/flow',
  flowTransactions: '/:contract/flow/transactions',
  tvl: '/:contract/tvl',
  tvlBounties: '/:contract/tvl/bounties',
  tvlNear: '/:contract/tvl/near',
  tvlDao: '/:contract/tvl/dao',
  tokens: '/:contract/tokens',
  tokensNumberFt: '/:contract/tokens/number-ft',
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
