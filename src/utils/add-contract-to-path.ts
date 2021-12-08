export const addContractToPath = (str: string, route: string): string =>
  str.replace(':contract', route);
