import { Contract } from '../api';

// workaround for network determination - should be included in contract metadata
export const isTestnet = (contract: Contract | null) =>
  contract?.contractName?.toLowerCase().includes('testnet');
