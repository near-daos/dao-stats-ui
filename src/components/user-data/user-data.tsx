import React, { ReactElement, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useLocalStorage } from 'react-use';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  selectorContractsLoadingState,
  getContracts,
  setContract,
  getCurrency,
} from 'src/app/shared';
import { CURRENCY_KEY } from '../../constants';

type UserDataProps = {
  children: (loadingContracts: string) => ReactElement;
};

export const UserData = ({ children }: UserDataProps): ReactElement => {
  const loadingContracts = useAppSelector(selectorContractsLoadingState);
  const dispatch = useAppDispatch();
  const [, setValue] = useLocalStorage(CURRENCY_KEY);

  useEffect(() => {
    (async () => {
      try {
        const currencyResponse = await dispatch(getCurrency());
        const currency = unwrapResult(currencyResponse);

        setValue(currency);

        const contractResponse = await dispatch(getContracts());
        const contracts = unwrapResult(contractResponse);

        dispatch(setContract(contracts[0]));
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, [dispatch, setValue]);

  return <>{children(loadingContracts)}</>;
};
