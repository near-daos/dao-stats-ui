import React, { FC, useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';
import clsx from 'clsx';
import { useForbiddenRoutes, useRoutes } from 'src/hooks';
import { useAppSelector } from 'src/store';
import startCase from 'lodash/startCase';

import { NavigationInfo } from '../navigation-info';
import { NavigationList } from '../navigation-list';

import styles from './sidebar.module.scss';
import { selectCurrentDao, selectSelectedContract } from '../../app/shared';
import { NetworkSwitcher } from '../network-switcher';
import { Dao } from '../../api';

export type SidebarProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const Sidebar: FC<SidebarProps> = ({ isOpen, setOpen }) => {
  const selectedContract = useAppSelector(selectSelectedContract);
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

  const getTitle = useCallback(
    (daoObject: Dao | null) => {
      if (daoObject?.dao) {
        const splittedDaoArray = daoObject.dao.split('.');
        const [, ...descriptionArray] = splittedDaoArray;

        return {
          title: `${startCase(splittedDaoArray[0])}`,
          description: descriptionArray.join('.'),
        };
      }

      return {
        title: `${(selectedContract?.contractId || '').toUpperCase()} DAO`,
        description: selectedContract?.contractName || '',
      };
    },
    [selectedContract],
  );

  const { title, description } = getTitle(dao);

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
          title={title}
          description={description}
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
