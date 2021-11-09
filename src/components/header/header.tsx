import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Tabs } from '../tabs';
import { Dropdown, DropdownOption } from '../dropdown/dropdown';

import logo from '../../images/daostats.svg';

import styles from './header.module.scss';

const tabOptions = [
  {
    label: 'Sputnik DAO',
    value: 'sputnik',
  },
  { label: 'Astro', value: 'astro' },
];

const dropdownOptions: DropdownOption[] = [
  {
    id: '0',
    name: 'Fatima Sanders',
    link: 'Quisque libero lacus, varius et, euismod et, commodo at, libero.',
    searchType: 'testnet',
    type: 'sputnik',
  },
  {
    id: '1',
    name: 'Xaviera Gibson',
    link:
      'Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus',
    searchType: 'testnet',
    type: 'astro',
  },
  {
    id: '2',
    name: 'Anthony Hawkins',
    link: 'ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo',
    searchType: 'mainnet',
    type: 'sputnik',
  },
  {
    id: '3',
    name: 'Hadassah Harrington',
    link:
      'ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam auctor, velit',
    searchType: 'mainnet',
    type: 'sputnik',
  },
  {
    id: '4',
    name: 'Abel Knight',
    link: 'felis. Donec tempor, est ac mattis semper, dui lectus rutrum',
    searchType: 'mainnet',
    type: 'astro',
  },
  {
    id: '5',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
    searchType: 'mainnet',
    type: 'sputnik',
  },
  {
    id: '6',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
    searchType: 'mainnet',
    type: 'astro',
  },
  {
    id: '7',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
    searchType: 'mainnet',
    type: 'sputnik',
  },
  {
    id: '8',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
    searchType: 'mainnet',
    type: 'sputnik',
  },
  {
    id: '9',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
    searchType: 'mainnet',
    type: 'sputnik',
  },
];

export const Header: FC = () => {
  const [dropdownValue, setDropDownValue] = useState<DropdownOption | null>(
    null,
  );

  return (
    <div className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="" />
      </Link>
      <div className={styles.center}>
        <Tabs variant="medium" options={tabOptions} />
        <Dropdown
          options={dropdownOptions}
          value={dropdownValue}
          onChange={(selectedItem) => setDropDownValue(selectedItem)}
        />
      </div>
    </div>
  );
};
