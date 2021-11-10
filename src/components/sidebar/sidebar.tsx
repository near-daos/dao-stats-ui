import React, { FC, useState } from 'react';

import { NavigationInfo } from '../navigation-info';
import { NavigationList } from '../navigation-list';

import styles from './sidebar.module.scss';

const overviewData = {
  title: 'Overview',
  options: [
    {
      label: 'General Info',
      value: 'general-info',
    },
    { label: 'Users', value: 'users' },
    { label: 'Activity', value: 'activity' },
  ],
};

const financialData = {
  title: 'Financial',
  options: [
    {
      label: 'Flow',
      value: 'flow',
    },
    {
      label: 'TVL',
      value: 'tvl',
    },
    {
      label: 'Token',
      value: 'token',
    },
  ],
};

export const Sidebar: FC = () => {
  const [active, setActive] = useState(overviewData.options[0]);

  const handlerChangeActive = (value: string) => {
    const newActiveElement =
      overviewData.options.find((option) => option.value === value) ||
      financialData.options.find((option) => option.value === value);

    if (newActiveElement) {
      setActive(newActiveElement);
    }
  };

  return (
    <div className={styles.sidebar}>
      <NavigationInfo
        title="Sputnik DAO"
        description="Average values for all DAOs"
        direction="left"
        className={styles.info}
      />
      <NavigationList
        title={overviewData.title}
        selectedOption={active}
        options={overviewData.options}
        onSelect={handlerChangeActive}
        className={styles.list}
      />
      <NavigationList
        title={financialData.title}
        selectedOption={active}
        options={financialData.options}
        onSelect={handlerChangeActive}
        className={styles.list}
      />
    </div>
  );
};
