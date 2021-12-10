import React, { ReactElement, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from '../../store';
import {
  selectorContractsLoadingState,
  getContracts,
  setContract,
} from '../../app/shared';

type UserDataProps = {
  children: (loadingContracts: string) => ReactElement;
};

export const UserData = ({ children }: UserDataProps) => {
  const loadingContracts = useAppSelector(selectorContractsLoadingState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await dispatch(getContracts());
        const rawData = unwrapResult(response);

        dispatch(setContract(rawData[0]));
      } catch (error: unknown) {
        console.error(error);
      }
    })();
  }, [dispatch]);

  return <>{children(loadingContracts)}</>;
};
