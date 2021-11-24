import React, { FC, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';

import { NavigationInfo } from '../navigation-info';
import { NavigationList } from '../navigation-list';
import { ROUTES } from '../../constants';

import styles from './sidebar.module.scss';

const overviewItems = [
  {
    label: 'General Info',
    value: ROUTES.generalInfo,
  },
  { label: 'Users', value: ROUTES.users },
  { label: 'Activity', value: ROUTES.activity },
];

const financialItems = [
  {
    label: 'Flow',
    value: ROUTES.flow,
  },
  {
    label: 'TVL',
    value: ROUTES.tvl,
  },
  {
    label: 'Tokens',
    value: ROUTES.tokens,
  },
];

export const Sidebar: FC = () => {
  const history = useHistory();
  const location = useLocation();

  const handlerChangeActive = useCallback(
    (value: string) => {
      history.push(value);
    },
    [history],
  );

  return (
    <div className={styles.sidebar}>
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
      />
      <NavigationList
        title="Financial"
        selectedValue={location.pathname}
        options={financialItems}
        onSelect={handlerChangeActive}
        className={styles.list}
      />
    </div>
  );
};
