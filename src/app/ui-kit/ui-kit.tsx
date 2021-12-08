import React, { FC, useState } from 'react';

import {
  Button,
  ChartBar,
  ChartLine,
  ChartPie,
  Dropdown,
  DropdownOption,
  Header,
  Leaderboard,
  LeaderboardDataItem,
  Loading,
  NavigationInfo,
  NavigationList,
  Search,
  Sidebar,
  StackedChart,
  SvgIcon,
  Tabs,
  WidgetInfo,
  WidgetTile,
} from '../../components';
import { NETWORKS } from '../../constants';
import { getRechartsData, pieData } from '../../components/charts/rechartsData';
import logo from '../../images/sputnik.png';

import styles from './ui-kit.module.scss';

const currentDate = new Date().getDate();

const tableMock1: LeaderboardDataItem[] = [
  {
    id: 1,
    titleCell: {
      logo,
      label: 'jonathan',
      domain: '.sputnikdao.near',
    },
    line: {
      totalMetrics: {
        count: 10,
        growth: 9200,
      },
      metrics: [
        { timestamp: currentDate, count: 400 },
        { timestamp: currentDate, count: 400 },
      ],
    },
  },
  {
    id: 2,
    titleCell: {
      logo,
      label: 'JBN',
      domain: '.example.test',
    },
    line: {
      totalMetrics: {
        count: 10,
        growth: 9200,
      },
      metrics: [
        { timestamp: currentDate, count: 400 },
        { timestamp: currentDate, count: 400 },
      ],
    },
  },
  {
    id: 3,
    titleCell: {
      logo,
      label: 'Oklahoma',
      domain: '.oklahoma.okh',
    },
    line: {
      totalMetrics: {
        count: 10,
        growth: 9200,
      },
      metrics: [
        { timestamp: currentDate, count: 400 },
        { timestamp: currentDate, count: 400 },
      ],
    },
  },
  {
    id: 4,
    titleCell: {
      logo,
      label: 'ProfTool',
      domain: '.proftool.com',
    },
    line: {
      totalMetrics: {
        count: 10,
        growth: 9200,
      },
      metrics: [
        { timestamp: currentDate, count: 400 },
        { timestamp: currentDate, count: 400 },
      ],
    },
  },
];

const tableMock2: LeaderboardDataItem[] = [
  {
    id: 1,
    titleCell: {
      logo,
      label: 'jonathan',
      domain: '.sputnikdao.near',
    },
    doubleLine: {
      number: {
        totalMetrics: {
          count: 10,
          growth: 9200,
        },
        metrics: [
          { timestamp: currentDate, count: 400 },
          { timestamp: currentDate, count: 400 },
        ],
      },
      vl: {
        totalMetrics: {
          count: 10,
          growth: 9200,
        },
        metrics: [
          { timestamp: currentDate, count: 400 },
          { timestamp: currentDate, count: 400 },
        ],
      },
    },
  },
  {
    id: 2,
    titleCell: {
      logo,
      label: 'JBN',
      domain: '.example.test',
    },
    doubleLine: {
      number: {
        totalMetrics: {
          count: 10,
          growth: 9200,
        },
        metrics: [
          { timestamp: currentDate, count: 400 },
          { timestamp: currentDate, count: 400 },
        ],
      },
      vl: {
        totalMetrics: {
          count: 10,
          growth: 9200,
        },
        metrics: [
          { timestamp: currentDate, count: 400 },
          { timestamp: currentDate, count: 400 },
        ],
      },
    },
  },
  {
    id: 3,
    titleCell: {
      logo,
      label: 'Oklahoma',
      domain: '.oklahoma.okh',
    },
    doubleLine: {
      number: {
        totalMetrics: {
          count: 10,
          growth: 9200,
        },
        metrics: [
          { timestamp: currentDate, count: 400 },
          { timestamp: currentDate, count: 400 },
        ],
      },
      vl: {
        totalMetrics: {
          count: 10,
          growth: 9200,
        },
        metrics: [
          { timestamp: currentDate, count: 400 },
          { timestamp: currentDate, count: 400 },
        ],
      },
    },
  },
  {
    id: 4,
    titleCell: {
      logo,
      label: 'ProfTool',
      domain: '.proftool.com',
    },
    doubleLine: {
      number: {
        totalMetrics: {
          count: 10,
          growth: 9200,
        },
        metrics: [
          { timestamp: currentDate, count: 400 },
          { timestamp: currentDate, count: 400 },
        ],
      },
      vl: {
        totalMetrics: {
          count: 10,
          growth: 9200,
        },
        metrics: [
          { timestamp: currentDate, count: 400 },
          { timestamp: currentDate, count: 400 },
        ],
      },
    },
  },
];

const tableMock3: LeaderboardDataItem[] = [
  {
    id: 1,
    titleCell: {
      logo,
      label: 'jonathan',
      domain: '.sputnikdao.near',
    },
    stacked: [{ value: 70 }, { value: 28 }, { value: 1 }, { value: 1 }],
  },
  {
    id: 2,
    titleCell: {
      logo,
      label: 'JBN',
      domain: '.example.test',
    },
    stacked: [{ value: 47 }, { value: 13 }, { value: 1 }, { value: 39 }],
  },
  {
    id: 3,
    titleCell: {
      logo,
      label: 'Oklahoma',
      domain: '.oklahoma.okh',
    },
    stacked: [{ value: 96 }, { value: 3 }, { value: 1 }, { value: 1 }],
  },
  {
    id: 4,
    titleCell: {
      logo,
      label: 'ProfTool',
      domain: '.proftool.com',
    },
    stacked: [{ value: 0 }, { value: 3 }, { value: 50 }, { value: 47 }],
  },
];

const options: DropdownOption[] = [
  {
    id: '0',
    name: 'Fatima Sanders',
    link: 'Quisque libero lacus, varius et, euismod et, commodo at, libero.',
    searchType: NETWORKS.Mainnet,
    type: 'sputnik',
  },
  {
    id: '1',
    name: 'Xaviera Gibson',
    link:
      'Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus',
    searchType: NETWORKS.Mainnet,
    type: 'astro',
  },
  {
    id: '2',
    name: 'Anthony Hawkins',
    link: 'ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo',
    searchType: NETWORKS.Mainnet,
    type: 'sputnik',
  },
  {
    id: '3',
    name: 'Hadassah Harrington',
    link:
      'ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam auctor, velit',
    searchType: NETWORKS.Mainnet,
    type: 'sputnik',
  },
  {
    id: '4',
    name: 'Abel Knight',
    link: 'felis. Donec tempor, est ac mattis semper, dui lectus rutrum',
    searchType: NETWORKS.Mainnet,
    type: 'astro',
  },
  {
    id: '5',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
    searchType: NETWORKS.Mainnet,
    type: 'sputnik',
  },
  {
    id: '6',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
    searchType: NETWORKS.Mainnet,
    type: 'astro',
  },
  {
    id: '7',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
    searchType: NETWORKS.Mainnet,
    type: 'sputnik',
  },
  {
    id: '8',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
    searchType: NETWORKS.Mainnet,
    type: 'sputnik',
  },
  {
    id: '9',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
    searchType: NETWORKS.Mainnet,
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

export const leaderboardData = [
  {
    id: 1,
    logo,
    label: 'jonathan',
    domain: '.sputnikdao.near',
    activity: 9290,
    percentChanges: 10,
    data: [
      { name: '1/11/20', 'Total In': 400 },
      { name: '2/11/20', 'Total In': 500 },
      { name: '3/11/20', 'Total In': 200 },
      { name: '4/11/20', 'Total In': 230 },
      { name: '5/11/20', 'Total In': 220 },
      { name: '6/11/20', 'Total In': 300 },
      { name: '7/11/20', 'Total In': 500 },
      { name: '8/11/20', 'Total In': 400 },
      { name: '9/11/20', 'Total In': 500 },
      { name: '10/11/20', 'Total In': 200 },
      { name: '11/11/20', 'Total In': 200 },
      { name: '12/11/20', 'Total In': 300 },
      { name: '13/11/20', 'Total In': 300 },
      { name: '14/11/20', 'Total In': 340 },
      { name: '15/11/20', 'Total In': 350 },
      { name: '16/11/20', 'Total In': 340 },
      { name: '17/11/20', 'Total In': 320 },
      { name: '18/11/20', 'Total In': 350 },
      { name: '19/11/20', 'Total In': 370 },
      { name: '20/11/20', 'Total In': 375 },
      { name: '21/11/20', 'Total In': 350 },
      { name: '22/11/20', 'Total In': 345 },
      { name: '23/11/20', 'Total In': 345 },
      { name: '24/11/20', 'Total In': 320 },
      { name: '25/11/20', 'Total In': 300 },
      { name: '26/11/20', 'Total In': 280 },
      { name: '27/11/20', 'Total In': 300 },
      { name: '28/11/20', 'Total In': 310 },
      { name: '29/11/20', 'Total In': 340 },
      { name: '30/11/20', 'Total In': 290 },
      { name: '31/11/20', 'Total In': 300 },
    ],
  },
  {
    id: 2,
    logo,
    label: 'JBN',
    domain: '.example.test',
    activity: 8654,
    percentChanges: 7,
    data: [
      { name: '1/11/20', 'Total In': 470 },
      { name: '2/11/20', 'Total In': 500 },
      { name: '3/11/20', 'Total In': 440 },
      { name: '4/11/20', 'Total In': 500 },
      { name: '5/11/20', 'Total In': 560 },
      { name: '6/11/20', 'Total In': 620 },
      { name: '7/11/20', 'Total In': 650 },
      { name: '8/11/20', 'Total In': 500 },
      { name: '9/11/20', 'Total In': 500 },
      { name: '10/11/20', 'Total In': 700 },
      { name: '11/11/20', 'Total In': 430 },
      { name: '12/11/20', 'Total In': 800 },
      { name: '13/11/20', 'Total In': 600 },
      { name: '14/11/20', 'Total In': 200 },
      { name: '15/11/20', 'Total In': 800 },
      { name: '16/11/20', 'Total In': 340 },
      { name: '17/11/20', 'Total In': 600 },
      { name: '18/11/20', 'Total In': 200 },
      { name: '19/11/20', 'Total In': 770 },
      { name: '20/11/20', 'Total In': 190 },
      { name: '21/11/20', 'Total In': 300 },
      { name: '22/11/20', 'Total In': 140 },
      { name: '23/11/20', 'Total In': 600 },
      { name: '24/11/20', 'Total In': 700 },
      { name: '25/11/20', 'Total In': 800 },
      { name: '26/11/20', 'Total In': 120 },
      { name: '27/11/20', 'Total In': 500 },
      { name: '28/11/20', 'Total In': 120 },
      { name: '29/11/20', 'Total In': 800 },
      { name: '30/11/20', 'Total In': 400 },
      { name: '31/11/20', 'Total In': 510 },
    ],
  },
  {
    id: 3,
    logo,
    label: 'Oklahoma',
    domain: '.oklahoma.okh',
    activity: 5887,
    percentChanges: 16,
    data: [
      { name: '1/11/20', 'Total In': 120 },
      { name: '2/11/20', 'Total In': 900 },
      { name: '3/11/20', 'Total In': 200 },
      { name: '4/11/20', 'Total In': 600 },
      { name: '5/11/20', 'Total In': 180 },
      { name: '6/11/20', 'Total In': 320 },
      { name: '7/11/20', 'Total In': 470 },
      { name: '8/11/20', 'Total In': 100 },
      { name: '9/11/20', 'Total In': 600 },
      { name: '10/11/20', 'Total In': 150 },
      { name: '11/11/20', 'Total In': 670 },
      { name: '12/11/20', 'Total In': 100 },
      { name: '13/11/20', 'Total In': 700 },
      { name: '14/11/20', 'Total In': 200 },
      { name: '15/11/20', 'Total In': 800 },
      { name: '16/11/20', 'Total In': 340 },
      { name: '17/11/20', 'Total In': 600 },
      { name: '18/11/20', 'Total In': 200 },
      { name: '19/11/20', 'Total In': 770 },
      { name: '20/11/20', 'Total In': 400 },
      { name: '21/11/20', 'Total In': 100 },
      { name: '22/11/20', 'Total In': 140 },
      { name: '23/11/20', 'Total In': 700 },
      { name: '24/11/20', 'Total In': 700 },
      { name: '25/11/20', 'Total In': 400 },
      { name: '26/11/20', 'Total In': 740 },
      { name: '27/11/20', 'Total In': 890 },
      { name: '28/11/20', 'Total In': 120 },
      { name: '29/11/20', 'Total In': 800 },
      { name: '30/11/20', 'Total In': 400 },
      { name: '31/11/20', 'Total In': 510 },
    ],
  },
  {
    id: 4,
    logo,
    label: 'ProfTool',
    domain: '.proftool.com',
    activity: 1544,
    percentChanges: -3,
    negativeGrowth: true,
    data: [
      { name: '1/11/20', 'Total In': 740 },
      { name: '2/11/20', 'Total In': 900 },
      { name: '3/11/20', 'Total In': 430 },
      { name: '4/11/20', 'Total In': 500 },
      { name: '5/11/20', 'Total In': 495 },
      { name: '6/11/20', 'Total In': 731 },
      { name: '7/11/20', 'Total In': 787 },
      { name: '8/11/20', 'Total In': 157 },
      { name: '9/11/20', 'Total In': 985 },
      { name: '10/11/20', 'Total In': 887 },
      { name: '11/11/20', 'Total In': 487 },
      { name: '12/11/20', 'Total In': 987 },
      { name: '13/11/20', 'Total In': 198 },
      { name: '14/11/20', 'Total In': 162 },
      { name: '15/11/20', 'Total In': 897 },
      { name: '16/11/20', 'Total In': 654 },
      { name: '17/11/20', 'Total In': 159 },
      { name: '18/11/20', 'Total In': 753 },
      { name: '19/11/20', 'Total In': 357 },
      { name: '20/11/20', 'Total In': 951 },
      { name: '21/11/20', 'Total In': 100 },
      { name: '22/11/20', 'Total In': 987 },
      { name: '23/11/20', 'Total In': 565 },
      { name: '24/11/20', 'Total In': 897 },
      { name: '25/11/20', 'Total In': 987 },
      { name: '26/11/20', 'Total In': 651 },
      { name: '27/11/20', 'Total In': 324 },
      { name: '28/11/20', 'Total In': 248 },
      { name: '29/11/20', 'Total In': 846 },
      { name: '30/11/20', 'Total In': 579 },
      { name: '31/11/20', 'Total In': 510 },
    ],
  },
];

export const UiKIt: FC = () => {
  const [searchType, setSearchType] = useState<NETWORKS>(NETWORKS.Mainnet);
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
          {/*  <ChartLine data={rechartsData} /> */}
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
          <div className={styles.column}>
            <WidgetTile>
              <WidgetInfo
                title="Number of Proposals"
                number={456.2}
                percentages={10}
              />
            </WidgetTile>
          </div>
          <div className={styles.column}>
            <WidgetTile active>
              <WidgetInfo
                title="Vote through rate"
                number={456.2}
                percentages={100}
              />
              <WidgetInfo
                title="Vote through rate"
                number={456.2}
                percentages={-100}
              />
            </WidgetTile>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Stacked chart</div>
        <div className={styles.container}>
          <StackedChart
            data={[{ value: 10 }, { value: 50 }, { value: 25 }, { value: 15 }]}
          />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Leaderboard type 1</div>
        <div className={styles.container}>
          <Leaderboard
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'DAOs activity' },
              { value: 'Last 7 days', position: 'right' },
            ]}
            type="line"
            dataRows={tableMock1}
          />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Leaderboard type 2</div>
        <div className={styles.container}>
          <Leaderboard
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },

              { value: 'Number of Bounties' },
              { value: 'VL of Bounties' },
            ]}
            type="doubleLine"
            dataRows={tableMock2}
          />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Leaderboard type 3</div>
        <div className={styles.container}>
          <Leaderboard
            headerCells={[
              { value: '' },
              { value: 'DAO Name' },
              { value: 'Proposals by type' },
            ]}
            type="stacked"
            dataRows={tableMock3}
          />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>Loading</div>
        <div className={styles.container}>
          <Loading />
        </div>
      </section>
    </div>
  );
};
