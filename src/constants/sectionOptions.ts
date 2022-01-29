import { useRoutes } from 'src/hooks';

export const GetSectionOptions = (currentSection: string) => {
  const routes = useRoutes();

  const sectionsOptions = {
    generalInfoOptions: [
      {
        label: 'Active DAOs',
        value: routes.generalInfo,
      },
      { label: 'Number of DAOs', value: routes.generalInfoDaoCount },
      { label: 'Groups', value: routes.generalInfoGroups },
      { label: 'Avg. Groups/DAO', value: routes.generalInfoAverageGroups },
    ],
    usersAndActivityOptions: [
      {
        label: 'All users on a platform',
        value: routes.users,
      },
      { label: 'Users that are member of a DAO', value: routes.usersMembers },
      {
        label: 'Average number of users per DAO',
        value: routes.usersAverageUsers,
      },
      { label: 'Number of Interactions', value: routes.usersInteractions },
      {
        label: 'Average number of Interactions per DAO',
        value: routes.usersAverageInteractions,
      },
    ],
    governanceOptions: [
      { label: 'Number of Proposals', value: routes.governance },
      { label: 'Vote through rate', value: routes.governanceVoteRate },
      { label: 'Proposals by type', value: routes.governanceProposalType },
    ],
    flowOptions: [
      { label: 'Total in', value: routes.flow },
      { label: 'Total Out', value: routes.flowOutgoingFunds },
      {
        label: 'Incoming Transactions',
        value: routes.flowIncomingTransactions,
      },
      {
        label: 'Outgoing Transactions',
        value: routes.flowOutgoingTransactions,
      },
    ],
    tvlOptions: [
      { label: 'Platform TVL', value: routes.tvl },
      { label: 'VL in Bounties/Grants', value: routes.tvlBountiesAndGrantsVl },
    ],
    tokensOptions: [
      { label: 'Platform TVL', value: routes.tokens },
      { label: 'Number of FTs', value: routes.tokensFtsVl },
      { label: 'VL of FTs', value: routes.tokensNfts },
    ],
  };

  switch (currentSection) {
    case 'general-info':
      return sectionsOptions.generalInfoOptions;

    case 'users':
      return sectionsOptions.usersAndActivityOptions;

    case 'governance':
      return sectionsOptions.governanceOptions;

    case 'flow':
      return sectionsOptions.flowOptions;

    case 'tvl':
      return sectionsOptions.tvlOptions;

    case 'tokens':
      return sectionsOptions.tokensOptions;

    default:
      return [];
  }
};
