import React, { FC } from 'react';

import { SvgIcon, Button, Search, Tabs } from '../../components';

import { ChartLine } from '../../components/charts/line-chart';
import { ChartBar } from '../../components/charts/bar-chart';
import { ChartPie } from '../../components/charts/pie-chart';
import { RechartsData, PieDatas } from '../../components/charts/RechartsData';

import styles from './ui-kit.module.scss';

export const UiKIt: FC = () => (
  <div className={styles.uiKit}>
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
            onChange={(id) => {
              console.log(id);
            }}
          />
        </div>
      </div>
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
      <div>
        <ChartLine data={RechartsData} />
      </div>
    </section>
    <section className={styles.section}>
      <div>
        <ChartBar data={RechartsData} />
      </div>
    </section>
    <section className={styles.section}>
      <div>
        <ChartPie data={PieDatas[0]} />
        <ChartPie data={PieDatas[1]} />
        <ChartPie data={PieDatas[2]} />
        <ChartPie data={PieDatas[3]} />
      </div>
    </section>
  </div>
);
