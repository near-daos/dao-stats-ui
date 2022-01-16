import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import desktopLogo from 'src/images/logo-mobile.svg';
import mobileLogo from 'src/images/daostats.svg';
import { useForbiddenRoutes } from 'src/hooks';
import startCase from 'lodash/startCase';
import { generatePath, useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/store';
import { clearDao, selectContracts } from 'src/app/shared';
import { ROUTES } from 'src/constants';

import { SvgIcon } from '../svgIcon/svgIcon';

import styles from './header.module.scss';

import { NetworkSwitcher } from '../network-switcher';
import { Autocomplete } from '../autocomplete';
import { Tabs } from '../tabs';

export type HeaderProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const Header: FC<HeaderProps> = ({ isOpen, setOpen }) => {
  const { isForbiddenHeader } = useForbiddenRoutes();
  const contracts = useAppSelector(selectContracts);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const tabOptions = useMemo(() => {
    if (!contracts) {
      return [];
    }

    return contracts.map((contract) => ({
      value: contract.contractId,
      label: startCase(contract.contractId),
    }));
  }, [contracts]);

  const onOptionChange = (value: string) => {
    history.push(generatePath(ROUTES.generalInfo, { contract: value }));
    dispatch(clearDao());
  };

  return (
    <div className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img
          className={styles.desktopImage}
          src={desktopLogo}
          alt="Dao Stats"
        />
        <img className={styles.mobileImage} src={mobileLogo} alt="Dao Stats" />
      </Link>
      {!isForbiddenHeader ? (
        <div className={styles.rightPart}>
          <Tabs
            onChange={onOptionChange}
            variant="small"
            options={tabOptions}
            className={styles.tabs}
          />
          <Autocomplete />
        </div>
      ) : null}
      <button
        type="button"
        className={styles.mobileIcon}
        onClick={() => setOpen(!isOpen)}
      >
        <SvgIcon icon={isOpen ? 'close' : 'burger'} />
      </button>

      {isForbiddenHeader ? (
        <div className={styles.main}>
          <NetworkSwitcher />
        </div>
      ) : null}
    </div>
  );
};
