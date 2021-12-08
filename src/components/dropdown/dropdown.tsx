import React, { FC, useState } from 'react';
import Downshift, { GetItemPropsOptions } from 'downshift';
import clsx from 'clsx';

import { Search } from '../search/search';
import astroImage from '../../images/astro.png';
import sputnikImage from '../../images/sputnik.png';
import { NETWORKS } from '../../constants';

import styles from './dropdown.module.scss';

export type DropdownOption = {
  id: string;
  name: string;
  link: string;
  searchType: NETWORKS;
  type: 'sputnik' | 'astro';
};

export type DropdownProps = {
  id?: string;
  className?: string;
  dropdownClassName?: string;
  onChange?: (selectedItem: DropdownOption | null) => void;
  placeholder?: string;
  options: DropdownOption[];
  initialSelectedItem?: DropdownOption;
  value?: DropdownOption | null;
};

export const Dropdown: FC<DropdownProps> = ({
  id = 'dropdown',
  className,
  dropdownClassName,
  onChange = () => undefined,
  options,
  initialSelectedItem = undefined,
  value,
}) => {
  const [searchType, setSearchType] = useState<NETWORKS>(NETWORKS.Mainnet);

  const renderOptions = ({
    getItemProps,
    inputValue,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getItemProps: (options: GetItemPropsOptions<DropdownOption>) => any;
    inputValue: null | string;
  }) => {
    const filteredOptions = options.filter(
      (option) =>
        option.searchType === searchType &&
        (option.name.toLowerCase().includes(inputValue?.toLowerCase() || '') ||
          option.link.toLowerCase().includes(inputValue?.toLowerCase() || '')),
    );

    if (filteredOptions.length > 0) {
      return (
        <>
          <li className={styles.foundTitle}>
            Found {filteredOptions.length} DAOs
          </li>
          {filteredOptions.map((option, index) => (
            <li
              {...getItemProps({
                key: option.id,
                index,
                item: option,
                className: styles.dropDownItem,
              })}
            >
              <div className={styles.image}>
                {option.type === 'astro' ? (
                  <img src={astroImage} alt="astro" />
                ) : (
                  <img src={sputnikImage} alt="sputnik" />
                )}
              </div>
              <span className={styles.name}>{option.name}</span>
              <span className={styles.link}>{option.link}</span>
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
      itemToString={(item) => (item ? item.name : '')}
      initialSelectedItem={initialSelectedItem}
      selectedItem={value}
      initialInputValue={value?.name}
      onInputValueChange={(inputValue) => {
        if (inputValue === '') {
          onChange(null);
        }
      }}
    >
      {({ getItemProps, getMenuProps, getInputProps, isOpen, inputValue }) => (
        <div className={clsx(styles.root, className)}>
          <Search
            inputProps={{ ...getInputProps() }}
            setSearchType={setSearchType}
            searchType={searchType}
          />
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

export default Dropdown;
