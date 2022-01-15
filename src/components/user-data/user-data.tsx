import React, { ReactElement, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useLocalStorage } from 'react-use';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from 'src/store';
import {
  selectContractsLoadingState,
  getContracts,
  setContract,
  getCurrency,
  getDao,
} from 'src/app/shared';
import { CURRENCY_KEY, Params } from '../../constants';

type UserDataProps = {
  children: (loadingContracts: string) => ReactElement;
};

export const UserData = ({ children }: UserDataProps): ReactElement => {
  const { dao, contract } = useParams<Params>();
  const loadingContracts = useAppSelector(selectContractsLoadingState);
  const dispatch = useAppDispatch();
  const [, setValue] = useLocalStorage(CURRENCY_KEY);

  useEffect(() => {
    (async () => {
      try {
        const currencyResponse = await dispatch(getCurrency());
        const currency = unwrapResult(currencyResponse);

        setValue(currency);

        const contractResponse = await dispatch(getContracts());
        const contracts = unwrapResult(contractResponse).data;

        dispatch(setContract(contracts[0]));
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, [dispatch, setValue]);

  useEffect(() => {
    if (!dao || !contract) {
      return;
    }

    dispatch(getDao({ contract, dao }));
  }, [dispatch, dao, contract]);

  return <>{children(loadingContracts)}</>;
};
