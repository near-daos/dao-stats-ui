import React, { FC, ReactNode } from 'react';
import Downshift, { GetItemPropsOptions } from 'downshift';
import clsx from 'clsx';

import { Search } from '../../search/search';
import { Loading } from '../../loading';
import { MIN_SEARCH_SYMBOLS } from '../constants';

import styles from '../autocomplete.module.scss';

export type AutocompleteOption = {
  description: string;
  title: string;
  image?: string;
  id: string;
};

export type AutocompleteProps = {
  id?: string;
  className?: string;
  dropdownClassName?: string;
  onChange?: (selectedItem: AutocompleteOption | null) => void;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  initialSelectedItem?: AutocompleteOption;
  value?: AutocompleteOption | null;
  disabled?: boolean;
  options?: AutocompleteOption[];
  isLoading?: boolean;
};

export const AutocompleteDropdown: FC<AutocompleteProps> = ({
  id = 'autocomplete',
  className,
  dropdownClassName,
  onChange = () => undefined,
  initialSelectedItem = undefined,
  value,
  disabled,
  options = [],
  onInputChange,
  isLoading,
}) => {
  const renderOptions = ({
    inputValue,
    getItemProps,
    isShowLoading,
  }: {
    inputValue: string | null;
    getItemProps: (
      options: GetItemPropsOptions<AutocompleteOption>,
    ) => ReactNode;
    isShowLoading?: boolean;
  }) => {
    if (!inputValue || inputValue.length < MIN_SEARCH_SYMBOLS) {
      return null;
    }

    if (options?.length > 0) {
      return (
        <>
          <li className={styles.foundTitle}>
            Found {options?.length} DAO{options.length > 1 ? 's' : ''}
          </li>
          {options?.map((option: AutocompleteOption, index: number) => (
            <li
              {...getItemProps({
                key: option.id,
                index,
                item: option,
                className: styles.dropDownItem,
              })}
            >
              {option.image ? (
                <div className={styles.image}>
                  <img src={`data:image/jpeg;base64, ${option.image}`} alt="" />
                </div>
              ) : null}
              {option.title ? (
                <span className={styles.name}>{option.title}</span>
              ) : null}
              {option.description ? (
                <span className={styles.link}>{option.description}</span>
              ) : null}
            </li>
          ))}
        </>
      );
    }

    if (isShowLoading) {
      return <Loading className={styles.loading} />;
    }

    if (options?.length === 0) {
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
    }

    return null;
  };

  return (
    <Downshift
      id={id}
      onChange={onChange}
      itemToString={(item) => (item ? item.title : '')}
      initialSelectedItem={initialSelectedItem}
      selectedItem={value}
      initialInputValue={value?.title}
      onInputValueChange={(inputValue) => {
        if (inputValue === '') {
          onChange(null);
        }

        if (onInputChange) {
          onInputChange(inputValue);
        }
      }}
    >
      {({
        getItemProps,
        getMenuProps,
        getInputProps,
        inputValue,
        isOpen,
        clearSelection,
        selectedItem,
      }) => (
        <div className={clsx(styles.root, className)}>
          <Search
            isShowCloseIcon={Boolean(selectedItem)}
            onCloseClick={clearSelection}
            disabled={disabled}
            inputProps={{ ...getInputProps() }}
          />
          {isOpen ? (
            <div className={styles.overlayDropdown}>
              <div className={clsx(styles.dropdown, dropdownClassName)}>
                <ul {...getMenuProps()} className={styles.dropDownMenu}>
                  {renderOptions({
                    getItemProps,
                    inputValue,
                    isShowLoading: isLoading,
                  })}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Downshift>
  );
};
