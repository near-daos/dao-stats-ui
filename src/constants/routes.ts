export const ROUTES = {
  index: '/',
  uiKit: '/ui-kit',
  page404: '/404',

  generalInfo: '/:contract/general-info',
  generalInfoDaoCount: '/:contract/general-info/dao-count',
  generalInfoGroups: '/:contract/general-info/groups',
  generalInfoAverageGroups: '/:contract/general-info/average-groups',
  generalInfoDao: '/:contract/general-info/:dao',
  generalInfoDaoGroups: '/:contract/general-info/:dao/groups',

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
  flowOutgoingFunds: '/:contract/flow/outgoing-funds',
  flowIncomingTransactions: '/:contract/flow/incoming-transactions',
  flowOutgoingTransactions: '/:contract/flow/outgoing-transactions',

  flowDao: '/:contract/flow/:dao',
  flowDaoOutgoingFunds: '/:contract/flow/:dao/outgoing-funds',
  flowDaoIncomingTransactions: '/:contract/flow/:dao/incoming-transactions',
  flowDaoOutgoingTransactions: '/:contract/flow/:dao/outgoing-transactions',

  tvl: '/:contract/tvl',
  tvlBountiesAndGrantsVl: '/:contract/tvl/bounties-and-grants-vl',
  tvlFtsVl: '/:contract/tvl/tvl-vl',
  tvlDao: '/:contract/tvl/:dao',
  tvlDaoBountyVl: '/:contract/tvl/:dao/bounties/vl',
  tvlDaoTvl: '/:contract/tvl/:dao/tvl',

  tokens: '/:contract/tokens',
  tokensFtsVl: '/:contract/tokens/fts-vl',
  tokensNfts: '/:contract/tokens/nfts',
  tokensDao: '/:contract/tokens/:dao',
  tokensFtsVlDao: '/:contract/tokens/:dao/fts-vl',
  tokensNftsDao: '/:contract/tokens/:dao/nfts',
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

export type Routes = typeof ROUTES;

export type UrlParams = { dao: string; contract: string };
