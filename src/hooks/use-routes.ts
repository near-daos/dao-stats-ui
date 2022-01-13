import { useMemo } from 'react';
import set from 'lodash/set';
import get from 'lodash/get';
import { useAppSelector } from 'src/store';
import { selectorSelectedContract } from 'src/app/shared';
import { ROUTES, Routes } from 'src/constants';

export const useRoutes = (dao?: string): Routes => {
  const selectedContract = useAppSelector(selectorSelectedContract);

  return useMemo(() => {
    const result: Routes = { ...ROUTES };

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
