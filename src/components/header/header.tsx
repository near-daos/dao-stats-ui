import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useForbiddenRoutes } from 'src/hooks';

import desktopLogo from 'src/images/logo-mobile.svg';
import mobileLogo from 'src/images/daostats.svg';

import { SvgIcon } from '../svgIcon/svgIcon';

import styles from './header.module.scss';

import { NetworkSwitcher } from '../network-switcher';
import { Autocomplete } from '../autocomplete';
import { Breadcrumbs } from '../breadcrumbs';

export type HeaderProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const Header: FC<HeaderProps> = ({ isOpen, setOpen }) => {
  const { isForbiddenHeader } = useForbiddenRoutes();

  return (
    <div className={styles.header}>
      <div className={styles.leftPart}>
        <Link to="/" className={styles.logo}>
          <img
            className={styles.desktopImage}
            src={desktopLogo}
            alt="Dao Stats"
          />
          <img
            className={styles.mobileImage}
            src={mobileLogo}
            alt="Dao Stats"
          />
        </Link>
        {!isForbiddenHeader ? (
          <>
            <div className={styles.divider} />
            <Breadcrumbs className={styles.breadcrumbs} />
          </>
        ) : null}
      </div>
      {!isForbiddenHeader ? <Autocomplete /> : null}
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
