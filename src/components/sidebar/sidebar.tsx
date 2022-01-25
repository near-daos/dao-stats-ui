import React, { FC, useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';
import clsx from 'clsx';

import { useForbiddenRoutes, useRoutes } from 'src/hooks';
import { useAppSelector } from 'src/store';
import { selectCurrentDao } from 'src/app/shared';

import { NavigationList } from '../navigation-list';

import { NetworkSwitcher } from '../network-switcher';

import styles from './sidebar.module.scss';

export type SidebarProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const Sidebar: FC<SidebarProps> = ({ isOpen, setOpen }) => {
  const dao = useAppSelector(selectCurrentDao);
  const history = useHistory();
  const location = useLocation();
  const routes = useRoutes(dao?.dao);
  const { isForbiddenSidebar } = useForbiddenRoutes();

  const handlerChangeActive = useCallback(
    (value: string) => {
      setOpen(false);
      history.push(value);
    },
    [history, setOpen],
  );

  const overviewItems = useMemo(() => {
    if (dao) {
      return [
        {
          label: 'General Info',
          value: routes.generalInfoDao,
        },
        {
          label: 'Users and Activity',
          value: routes.usersDao,
        },
        {
          label: 'Governance',
          value: routes.governanceDao,
        },
      ];
    }

    return [
      {
        label: 'General Info',
        value: routes.generalInfo,
      },
      {
        label: 'Users and Activity',
        value: routes.users,
      },
      {
        label: 'Governance',
        value: routes.governance,
      },
    ];
  }, [routes, dao]);

  const financialItems = useMemo(() => {
    if (dao) {
      return [
        {
          label: 'Flow',
          value: routes.flowDao,
        },
        {
          label: 'TVL',
          value: routes.tvlDao,
        },
        {
          label: 'Tokens',
          value: routes.tokensDao,
        },
      ];
    }

    return [
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
  }, [routes, dao]);

  return (
    <>
      <div
        className={clsx(styles.sidebar, {
          [styles.show]: isOpen,
          [styles.hideOnDesktopMainPage]: isForbiddenSidebar,
        })}
      >
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
        <NetworkSwitcher className={styles.networksSwitcher} />
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
