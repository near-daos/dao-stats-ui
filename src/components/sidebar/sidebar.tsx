import React, { FC, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import clsx from 'clsx';

import { NavigationInfo } from '../navigation-info';
import { NavigationList } from '../navigation-list';
import { useForbiddenRoutes, useRoutes } from '../../hooks';

import styles from './sidebar.module.scss';
import { useAppSelector } from '../../store';
import { selectorSelectedContract } from '../../app/shared';

export type SidebarProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const Sidebar: FC<SidebarProps> = ({ isOpen, setOpen }) => {
  const selectedContract = useAppSelector(selectorSelectedContract);
  const history = useHistory();
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
