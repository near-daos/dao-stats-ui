import React, { FC, useCallback, useMemo } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import clsx from 'clsx';
import { Params } from 'src/constants';
import { useForbiddenRoutes, useRoutes } from 'src/hooks';
import { useAppSelector } from 'src/store';

import { NavigationInfo } from '../navigation-info';
import { NavigationList } from '../navigation-list';

import styles from './sidebar.module.scss';
import { selectorSelectedContract } from '../../app/shared';
import { NetworkSwitcher } from '../network-switcher';

export type SidebarProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const Sidebar: FC<SidebarProps> = ({ isOpen, setOpen }) => {
  const selectedContract = useAppSelector(selectorSelectedContract);
  const history = useHistory();
  const { dao } = useParams<Params>();
  const location = useLocation();
  const routes = useRoutes();
  const { isForbiddenSidebar } = useForbiddenRoutes();

  const handlerChangeActive = useCallback(
    (value: string) => {
      setOpen(false);
      history.push(value);
    },
    [history, setOpen],
  );

  console.log('dao', dao);

  const overviewItems = useMemo(() => {
    console.log(dao);

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
    console.log(dao);

    if (dao) {
      return [
        {
          label: 'Flow',
          value: routes.flow,
          disabled: true,
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
        disabled: true,
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
        <NavigationInfo
          className={styles.info}
          title={`${(selectedContract?.contractId || '').toUpperCase()} DAO`}
          description={selectedContract?.contractName || ''}
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
