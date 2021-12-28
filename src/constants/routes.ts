export const ROUTES = {
  index: '/',
  uiKit: '/ui-kit',
  page404: '/404',

  generalInfo: '/:contract/general-info',
  generalInfoDao: '/:contract/general-info/:dao',
  generalInfoDaoGroups: '/:contract/general-info/:dao/groups',
  generalInfoActiveDao: '/:contract/general-info/dao-active',
  generalInfoGroups: '/:contract/general-info/groups',
  generalInfoAverageGroups: '/:contract/general-info/average-groups',

  users: '/:contract/users',
  usersMembers: '/:contract/users/members',
  usersAverageUsers: '/:contract/users/average-users',
  usersAverageInteractions: '/:contract/users/average-interactions',
  usersInteractions: '/:contract/users/users-interactions',
  usersDao: '/:contract/users/:dao',
  usersMembersDao: '/:contract/users/:dao/members',
  usersInteractionsDao: '/:contract/users/:dao/interactions',

  governance: '/:contract/governance',
  governanceProposalType: '/:contract/governance/proposal-type',
  governanceVoteRate: '/:contract/governance/vote-rate',
  governanceDao: '/:contract/governance/:dao',
  governanceProposalTypeDao: '/:contract/governance/:dao/proposal-type',
  governanceVoteRateDao: '/:contract/governance/:dao/vote-rate',

  flow: '/:contract/flow',
  flowTransactions: '/:contract/flow/transactions',
  tvl: '/:contract/tvl',
  tvlBounties: '/:contract/tvl/bounties',
  tvlNear: '/:contract/tvl/near',
  tvlDao: '/:contract/tvl/dao',

  tokens: '/:contract/tokens',
  tokensFts: '/:contract/tokens/fts',
  tokensDao: '/:contract/tokens/:dao',
  tokensFtsDao: '/:contract/tokens/:dao/fts',
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

export type Params = { dao: string; contract: string };
