import React, { FC, useState, useEffect } from 'react';
import Downshift, { GetItemPropsOptions } from 'downshift';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectorContracts } from 'src/app/shared/contracts';

import { Search } from '../search/search';
import styles from './autocomplete.module.scss';
import { getDao } from '../../app/shared/daos/slice';
import { selectDao } from '../../app/shared/daos/selectors';

export type AutocompleteOption = {
  createdAt: string;
  dao: string;
  contractId: string;
  description: string | null;
  metadata: string | null;
};

export type AutocompleteProps = {
  id?: string;
  className?: string;
  dropdownClassName?: string;
  onChange?: (selectedItem: AutocompleteOption | null) => void;
  placeholder?: string;
  // options?: AutocompleteOption[];
  initialSelectedItem?: AutocompleteOption;
  value?: AutocompleteOption | null;
  disabled?: boolean;
};

export const Autocomplete: FC<AutocompleteProps> = ({
  id = 'autocomplete',
  className,
  dropdownClassName,
  onChange = () => undefined,
  // options,
  initialSelectedItem = undefined,
  value,
  disabled,
}) => {
  const [searchDaoValue, setsearchDaoValue] = useState<string>('');
  const getContract = useAppSelector(selectorContracts);
  const dispatch = useAppDispatch();
  const options = useAppSelector(selectDao) || [];

  let contract;

  if (getContract) {
    contract = getContract[0].contractId;
  }

  useEffect(() => {
    dispatch(
      getDao({ contract: 'astro', input: searchDaoValue }),
      // eslint-disable-next-line no-console
    ).catch((error: unknown) => console.error(error));
  }, [contract, dispatch, searchDaoValue]);

  const renderOptions = ({
    getItemProps,
    inputValue,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getItemProps: (options: GetItemPropsOptions<AutocompleteOption>) => any;
    inputValue: string | null;
  }) => {
    setsearchDaoValue(inputValue || '');

    if (options?.length > 0) {
      return (
        <>
          <li className={styles.foundTitle}>Found {options?.length} DAOs</li>
          {options?.map((option: AutocompleteOption, index: number) => (
            <li
              {...getItemProps({
                key: option.dao,
                index,
                item: option,
                className: styles.dropDownItem,
              })}
            >
              <div className={styles.image} />
              <span className={styles.name}>{option.dao}</span>
              <span className={styles.link}>{option.description}</span>
            </li>
          ))}
        </>
      );
    }

    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundTitle}>
          It looks like there aren`t matches for your search.
        </div>
        <div className={styles.notFoundSubTitle}>
          Check the name of the DAO you are looking for.
        </div>
      </div>
    );
  };

  return (
    <Downshift
      id={id}
      onChange={onChange}
      itemToString={(item) => (item ? item.dao : '')}
      initialSelectedItem={initialSelectedItem}
      selectedItem={value}
      initialInputValue={value?.dao}
      onInputValueChange={(inputValue) => {
        if (inputValue === '') {
          onChange(null);
        }
      }}
    >
      {({
        getItemProps,
        getMenuProps,
        getInputProps,
        isOpen,
        inputValue = '',
      }) => (
        <div className={clsx(styles.root, className)}>
          <Search disabled={disabled} inputProps={{ ...getInputProps() }} />
          {isOpen ? (
            <div className={styles.overlayDropdown}>
              <div className={clsx(styles.dropdown, dropdownClassName)}>
                <ul {...getMenuProps()} className={styles.dropDownMenu}>
                  {renderOptions({ getItemProps, inputValue })}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Downshift>
  );
};

export default Autocomplete;
