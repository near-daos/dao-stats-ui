import { useMemo } from 'react';
import startCase from 'lodash/startCase';

import { useAppSelector } from '../store';
import { selectorContracts } from '../app/shared';

export const useOptionsForContract = () => {
  const contracts = useAppSelector(selectorContracts);

  return useMemo(() => {
    if (contracts) {
      return contracts.map((contract) => ({
        value: startCase(contract.contractId),
        label: startCase(contract.contractId),
      }));
    }

    return [];
  }, [contracts]);
};
