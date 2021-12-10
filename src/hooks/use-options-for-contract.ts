import { useMemo } from 'react';
import startCase from 'lodash/startCase';
import { TabOption } from 'src/components/tabs/tabs';

import { useAppSelector } from '../store';
import { selectorContracts } from '../app/shared';

export const useOptionsForContract = (): TabOption[] => {
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
