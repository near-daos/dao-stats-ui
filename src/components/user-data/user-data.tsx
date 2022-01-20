import React, { ReactElement, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useLocalStorage } from 'react-use';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from 'src/store';
import {
  getContracts,
  getCurrency,
  getDao,
  getPrice,
  selectContractsLoadingState,
  setContract,
} from 'src/app/shared';
import { CURRENCY_KEY, UrlParams } from '../../constants';
import { Coin, Currency } from '../../api';

type UserDataProps = {
  children: (loadingContracts: string) => ReactElement;
};

export const UserData = ({ children }: UserDataProps): ReactElement => {
  const { dao, contract } = useParams<UrlParams>();
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

        await dispatch(
          getPrice({
            currency: Currency.USD,
            coin: Coin.NEAR,
            to: String(new Date().getTime()),
          }),
        );

        dispatch(setContract(contracts[0]));
      } catch (error: unknown) {
        console.error(error);
      }
    })();
  }, [dispatch, setValue]);

  useEffect(() => {
    if (!dao || !contract) {
      return;
    }

    dispatch(getDao({ contract, dao })).catch((err) => console.error(err));
  }, [dispatch, dao, contract]);

  return <>{children(loadingContracts)}</>;
};
