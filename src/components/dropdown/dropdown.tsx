import React, { FC } from 'react';
import Downshift from 'downshift';
import clsx from 'clsx';

import { SvgIcon } from '../svgIcon';

import styles from './dropdown.module.scss';

export type DropdownOption = {
  id: string;
  value: string;
  label: string;
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
  console.log('options', options);

  return (
    <Downshift
      id={id}
      onChange={onChange}
      itemToString={(item) => (item ? item.value : '')}
      initialSelectedItem={initialSelectedItem}
      selectedItem={value}
      initialInputValue={value?.value}
      onInputValueChange={(inputValue) => {
        if (inputValue === '') {
          onChange(null);
        }
      }}
    >
      {({ getMenuProps, getToggleButtonProps, isOpen, selectedItem }) => (
        <div className={clsx(styles.root, className)}>
          <button {...getToggleButtonProps()} className={styles.selectedValue}>
            {selectedItem?.label || ''}
          </button>
          <SvgIcon
            icon="dropdownArrow"
            className={clsx(styles.arrow, { [styles.arrowUp]: isOpen })}
          />

          <div className={styles.overlayDropdown}>
            <div className={clsx(styles.dropdown, dropdownClassName)}>
              <ul {...getMenuProps()} className={styles.dropDownMenu}>
                {options.map((option) => (
                  <li className={styles.dropDownItem} key={option.id}>
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Downshift>
  );
};
