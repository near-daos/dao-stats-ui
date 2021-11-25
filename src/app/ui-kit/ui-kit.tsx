import React, { FC, useState } from 'react';

import {
  SvgIcon,
  Button,
  Search,
  Tabs,
  Dropdown,
  DropdownOption,
  Header,
  NavigationInfo,
  NavigationList,
  Sidebar,
  WidgetTile,
  WidgetInfo,
  ChartLine,
  ChartBar,
  ChartPie,
} from '../../components';

import { pieData, getRechartsData } from '../../components/charts/rechartsData';

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

const navigationOptions = [
  {
    label: 'General info',
    value: 'general-info',
  },
  {
    label: 'Users',
    value: 'users',
  },
  {
    label: 'Activity',
    value: 'activity',
  },
];

const rechartsData = getRechartsData();

export const UiKIt: FC = () => {
  const [searchType, setSearchType] = useState<'mainnet' | 'testnet'>(
    'mainnet',
  );
  const [dropdownValue, setDropDownValue] = useState<DropdownOption | null>(
    null,
  );

  return (
    <div className={styles.uiKit}>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Sidebar</div>
        <div className={styles.container}>
          <Sidebar />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Navigation List</div>
        <div className={styles.container}>
          <NavigationList
            title="Overview"
            options={navigationOptions}
            selectedValue={navigationOptions[0].value}
            onSelect={() => null}
          />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Navigation Info</div>
        <div className={styles.container}>
          <div className={styles.column}>
            <NavigationInfo
              title="Sputnik DAO"
              description="Average values for all DAOs"
            />
          </div>
          <div className={styles.column}>
            <NavigationInfo
              title="Sputnik DAO"
              description="Average values for all DAOs"
              color="blue"
            />
          </div>
          <div className={styles.column}>
            <NavigationInfo
              title="Sputnik DAO"
              description="Average values for all DAOs"
              color="yellow"
            />
          </div>
          <div className={styles.column}>
            <NavigationInfo
              title="Sputnik DAO"
              description="Average values for all DAOs"
              direction="left"
            />
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Header</div>
        <Header />
      </section>
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
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Chart Line Widget</div>
        <div className={styles.container}>
          <ChartLine data={rechartsData} />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Chart Bar Widget</div>
        <div className={styles.container}>
          <ChartBar data={rechartsData} />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Chart Bar Widget</div>
        <div className={styles.container}>
          <div className={styles.column}>
            <WidgetTile>
              <ChartPie data={pieData[0]} />
            </WidgetTile>
          </div>
          <div className={styles.column}>
            <WidgetTile>
              <ChartPie data={pieData[1]} />
            </WidgetTile>
          </div>
          <div className={styles.column}>
            <WidgetTile active>
              <ChartPie data={pieData[2]} />
            </WidgetTile>
          </div>
          <div className={styles.column}>
            <WidgetTile>
              <ChartPie data={pieData[3]} />
            </WidgetTile>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Info Widget</div>
        <div className={styles.container}>
          <WidgetTile>
            <WidgetInfo
              title="Number of Proposals"
              number="456,2"
              percentages={10}
            />
          </WidgetTile>
        </div>
        <div className={styles.container}>
          <WidgetTile active>
            <WidgetInfo
              title="Vote through rate"
              number="456,2"
              percentages={100}
            />
            <WidgetInfo
              title="Vote through rate"
              number="456,2"
              percentages={100}
              negativeGrowth
            />
          </WidgetTile>
        </div>
      </section>
    </div>
  );
};
