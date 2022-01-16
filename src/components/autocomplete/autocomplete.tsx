import React, { FC, useState, useEffect, useCallback, useMemo } from 'react';
import { generatePath, useHistory, useLocation } from 'react-router';
import debounce from 'lodash/debounce';
import { useAppSelector } from 'src/store';
import { selectSelectedContract } from 'src/app/shared/contracts';
import { daosService, Dao } from 'src/api';
import { ROUTES } from 'src/constants';

import {
  AutocompleteDropdown,
  AutocompleteOption,
} from './autocomplete-dropdown';

import { MIN_SEARCH_SYMBOLS, DEBOUNCE_DELAY } from './constants';

export type AutocompleteProps = {
  className?: string;
  dropdownClassName?: string;
  disabled?: boolean;
};

const prepareTitleDao = (daoTitle: string) => daoTitle.split('.')[0];

const prepareOptions = (daos: Dao[]): AutocompleteOption[] =>
  daos.map((dao) => ({
    title: prepareTitleDao(dao.dao),
    id: dao.dao,
    description: dao.description,
    image: dao.metadata?.flagLogo,
  }));

export const Autocomplete: FC<AutocompleteProps> = ({
  className,
  dropdownClassName,
  disabled,
}) => {
  const history = useHistory();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState<AutocompleteOption[]>([]);
  const [isLoading, setLoading] = useState(false);
  const selectedContract = useAppSelector(selectSelectedContract);

  const onInputChange = useCallback((valueString: string) => {
    setSearchValue(valueString);
  }, []);

  const onChange = useCallback(
    (selectedItem: AutocompleteOption | null) => {
      if (!selectedItem) {
        return;
      }

      let route = ROUTES.generalInfoDao;

      if (location.pathname.includes('general-info')) {
        route = ROUTES.generalInfoDao;
      }

      if (location.pathname.includes('users')) {
        route = ROUTES.usersDao;
      }

      if (location.pathname.includes('governance')) {
        route = ROUTES.governanceDao;
      }

      if (location.pathname.includes('tokens')) {
        route = ROUTES.tokensDao;
      }

      if (location.pathname.includes('tvl')) {
        route = ROUTES.tvlDao;
      }

      if (location.pathname.includes('flow')) {
        route = ROUTES.flowDao;
      }

      history.push(
        generatePath(route, {
          dao: selectedItem.id,
          contract: selectedContract?.contractId || '',
        }),
      );
    },
    [history, location.pathname, selectedContract?.contractId],
  );

  useEffect(() => {
    setLoading(true);
    setOptions([]);
  }, [searchValue]);

  useEffect(() => {
    if (searchValue.length === 0) {
      setOptions([]);
      setLoading(false);
    }
  }, [searchValue]);

  const handleDebounced = (contract: string, input: string) =>
    daosService
      .getAutocomplete({
        contract,
        input,
      })
      .then((response) => {
        setLoading(false);
        setOptions(prepareOptions(response.data));
      })
      .catch((error) => console.error(error));

  const debouncedSearch = useMemo(
    () =>
      debounce(
        (contract: string, input: string) => handleDebounced(contract, input),
        DEBOUNCE_DELAY,
      ),
    [],
  );

  useEffect(() => {
    if (searchValue.length >= MIN_SEARCH_SYMBOLS && searchValue.length !== 0) {
      debouncedSearch(selectedContract?.contractId || '', searchValue);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch, searchValue, selectedContract]);

  return (
    <AutocompleteDropdown
      isLoading={isLoading}
      onChange={onChange}
      onInputChange={onInputChange}
      disabled={disabled}
      options={options}
      className={className}
      dropdownClassName={dropdownClassName}
    />
  );
};

export default Autocomplete;
