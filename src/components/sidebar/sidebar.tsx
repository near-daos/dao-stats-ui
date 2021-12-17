import React, { FC, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import clsx from 'clsx';

import { NavigationInfo } from '../navigation-info';
import { NavigationList } from '../navigation-list';
import { useRoutes } from '../../hooks';

import styles from './sidebar.module.scss';

export type SidebarProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const Sidebar: FC<SidebarProps> = ({ isOpen, setOpen }) => {
  const history = useHistory();
  const location = useLocation();
  const routes = useRoutes();

  const handlerChangeActive = useCallback(
    (value: string) => {
      setOpen(false);
      history.push(value);
    },
    [history, setOpen],
  );

  const overviewItems = [
    {
      label: 'General Info',
      value: routes.generalInfo,
    },
    { label: 'Users and Activity', value: routes.users },
    { label: 'Governance', value: routes.governance },
  ];

  const financialItems = [
    {
      label: 'Flow',
      value: routes.flow,
      disabled: false,
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
    <>
      <div
        className={clsx(styles.sidebar, {
          [styles.show]: isOpen,
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
        />
        <NavigationList
          title="Financial"
          selectedValue={location.pathname}
          options={financialItems}
          onSelect={handlerChangeActive}
          className={styles.list}
        />

        {/* <div className={styles.navInfo}>
        <NavigationInfo
          title="Sputnik DAO"
          description="Average values for all DAOs"
          color="blue"
          direction="left"
          linePosition="start"
        />
      </div> */}
      </div>
      {isOpen ? (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className={styles.overlay}
        >
          {' '}
        </button>
      ) : null}
    </>
  );
};
