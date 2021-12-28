import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useForbiddenRoutes } from '../../hooks';

import { SvgIcon } from '../svgIcon/svgIcon';

import styles from './header.module.scss';

import desktopLogo from '../../images/logo-mobile.svg';
import mobileLogo from '../../images/daostats.svg';
import { NetworkSwitcher } from '../network-switcher';
import { Autocomplete } from '../autocomplete';

export type HeaderProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const Header: FC<HeaderProps> = ({ isOpen, setOpen }) => {
  const { isForbiddenHeader } = useForbiddenRoutes();

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
        <Autocomplete className={styles.autocomplete} />
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
