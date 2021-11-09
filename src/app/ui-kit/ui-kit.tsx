import React, { FC, useState } from 'react';

import {
  SvgIcon,
  Button,
  Search,
  Tabs,
  Dropdown,
  DropdownOption,
  Header,
} from '../../components';

import styles from './ui-kit.module.scss';

const options: DropdownOption[] = [
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

export const UiKIt: FC = () => {
  const [searchType, setSearchType] = useState<'mainnet' | 'testnet'>(
    'mainnet',
  );
  const [dropdownValue, setDropDownValue] = useState<DropdownOption | null>(
    null,
  );

  return (
    <div className={styles.uiKit}>
      <Header />
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Icons</div>
        <div className={styles.container}>
          <div className={styles.column}>
            <SvgIcon icon="search" />
          </div>
          <div className={styles.column}>
            <SvgIcon icon="crown" />
          </div>
          <div className={styles.column}>
            <SvgIcon icon="arrow" />
          </div>
          <div className={styles.column}>
            <SvgIcon icon="stats" />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>Buttons</div>
        <div className={styles.container}>
          <div className={styles.column}>
            <Button variant="icon" />
          </div>
          <div className={styles.column}>
            <Button disabled variant="icon" />
          </div>
          <div className={styles.column}>
            <Button>Back to homepage</Button>
          </div>
          <div className={styles.column}>
            <Button disabled>Back to homepage</Button>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>Search</div>
        <div className={styles.container}>
          <div className={styles.column}>
            <Search
              inputProps={{ type: 'text' }}
              searchType={searchType}
              setSearchType={(type) => setSearchType(type)}
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>Dropdown</div>
        <Dropdown
          options={options}
          value={dropdownValue}
          onChange={(selectedItem) => setDropDownValue(selectedItem)}
        />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>Tabs</div>
        <div className={styles.container}>
          <div className={styles.column}>
            <Tabs
              options={[
                {
                  label: 'Sputnik DAO',
                  value: 'sputnik',
                },
                {
                  label: 'Astro',
                  value: 'astro',
                },
                {
                  label: 'Astro 2',
                  value: 'astro 2',
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>Tabs with default value</div>
        <div className={styles.container}>
          <div className={styles.column}>
            <Tabs
              defaultValue="astro"
              options={[
                {
                  label: 'Sputnik DAO',
                  value: 'sputnik',
                },
                {
                  label: 'Astro',
                  value: 'astro',
                },
                {
                  label: 'Astro 2',
                  value: 'astro 2',
                },
              ]}
            />
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Scrollbar</div>
        <div className={styles.sectionLarge}>
          <div className={styles.largeBlock}>Scrollbar</div>
        </div>
      </section>
    </div>
  );
};
