import { useMemo } from 'react';

import { useAppSelector } from '../store';
import { selectorContracts } from '../app/shared';

export const useOptionsForContract = () => {
  const contracts = useAppSelector(selectorContracts);

  return useMemo(() => {
    if (contracts) {
      return contracts.map((contract) => ({
        value: contract.contractId,
        label: contract.contractId,
      }));
    }

    return [];
  }, [contracts]);
};
