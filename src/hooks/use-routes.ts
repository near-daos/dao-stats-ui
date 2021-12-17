import { useMemo } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';

import { useAppSelector } from '../store';
import { selectorSelectedContract } from '../app/shared';
import { ROUTES } from '../constants';

export const useRoutes = (dao?: string): { [key: string]: string } => {
  const selectedContract = useAppSelector(selectorSelectedContract);

  return useMemo(() => {
    const result = {};

    Object.keys(ROUTES).forEach((key) => {
      set(
        result,
        key,
        get(ROUTES, key)
          .replace(':contract', selectedContract?.contractId)
          .replace(':dao', dao || ''),
      );
    });

    return result;
  }, [selectedContract, dao]);
};
