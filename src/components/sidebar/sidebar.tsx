import React, { FC, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import clsx from 'clsx';

import { NavigationInfo } from '../navigation-info';
import { NavigationList } from '../navigation-list';
import { useAppSelector } from '../../store';
import { selectorSelectedContract } from '../../app/shared';
import { useRoutes } from '../../hooks';

import styles from './sidebar.module.scss';

export type SidebarProps = {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
};

export const Sidebar: FC<SidebarProps> = ({ isOpened, setIsOpened }) => {
  const selectedContract = useAppSelector(selectorSelectedContract);
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
    { label: 'Users', value: routes.users },
    { label: 'Activity', value: routes.activity },
  ];

  const financialItems = [
    {
      label: 'Flow',
      value: routes.flow,
    },
    {
      label: 'TVL',
      value: routes.tvl,
    },
    {
      label: 'Tokens',
      value: routes.tokens,
    },
  ];

  return (
    <div
      className={clsx(styles.sidebar, {
        [styles.show]: isOpened,
      })}
    >
      <NavigationInfo
        title="Sputnik DAO"
        description="Average values for all DAOs"
        direction="left"
        color="none"
        className={styles.info}
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
          className={styles.navigationInfo}
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
