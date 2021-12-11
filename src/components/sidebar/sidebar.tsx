import React, { FC, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import clsx from 'clsx';

import { NavigationInfo } from '../navigation-info';
import { NavigationList } from '../navigation-list';
import { useRoutes } from '../../hooks';

import styles from './sidebar.module.scss';

export type SidebarProps = {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
};

export const Sidebar: FC<SidebarProps> = ({ isOpened, setIsOpened }) => {
  const history = useHistory();
  const location = useLocation();
  const routes = useRoutes();

  const handlerChangeActive = useCallback(
    (value: string) => {
      history.push(value);
    },
    [history],
  );

  const overviewItems = [
    {
      label: 'General Info',
      value: routes.generalInfo,
    },
    { label: 'Users and Activity', value: routes.users },
    { label: 'Activity', value: routes.activity },
  ];

  const financialItems = [
    {
      label: 'Flow',
      value: routes.flow,
      disabled: true,
    },
    {
      label: 'TVL',
      value: routes.tvl,
      disabled: true,
    },
    {
      label: 'Tokens',
      value: routes.tokens,
      disabled: true,
    },
  ];

  return (
    <div
      className={clsx(styles.sidebar, {
        [styles.show]: isOpened,
      })}
    >
      <NavigationInfo
        className={styles.info}
        title="Sputnik DAO"
        description="Average values for all DAOs"
        direction="left"
        linePosition="start"
      />
      <NavigationList
        title="Overview"
        selectedValue={location.pathname}
        options={overviewItems}
        onSelect={handlerChangeActive}
        className={styles.list}
        setIsOpened={setIsOpened}
      />
      <NavigationList
        title="Financial"
        selectedValue={location.pathname}
        options={financialItems}
        onSelect={handlerChangeActive}
        className={styles.list}
        setIsOpened={setIsOpened}
      />
      <div className={styles.navInfo}>
        <NavigationInfo
          title="Sputnik DAO"
          description="Average values for all DAOs"
          color="blue"
          direction="left"
          linePosition="start"
        />
      </div>
    </div>
  );
};
