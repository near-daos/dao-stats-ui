import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Autocomplete, AutocompleteOption } from '../autocomplete/autocomplete';
import { useForbiddenRoutes } from '../../hooks';

import { SvgIcon } from '../svgIcon/svgIcon';

import styles from './header.module.scss';

import desktopLogo from '../../images/logo-mobile.svg';
import mobileLogo from '../../images/daostats.svg';
import { NetworkSwitcher } from '../network-switcher';

export type HeaderProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const Header: FC<HeaderProps> = ({ isOpen, setOpen }) => {
  const { isForbiddenHeader, isForbiddenFooter } = useForbiddenRoutes();
  const [dropdownValue, setDropDownValue] = useState<AutocompleteOption | null>(
    null,
  );

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
        <>
          {/* <div className={styles.headerControls}>
            <h1 className={styles.title}>Sputnik DAO</h1>
            <h3 className={styles.description}>Average values for all DAOs</h3>

            <button type="button" className={styles.mobileIcon}>
              <SvgIcon icon="search" />
            </button>          </div> */}
          {!isForbiddenFooter ? (
            <button
              type="button"
              className={styles.mobileIcon}
              onClick={() => setOpen(!isOpen)}
            >
              <SvgIcon icon={isOpen ? 'close' : 'burger'} />
            </button>
          ) : null}

          <div className={styles.main}>
            <NetworkSwitcher />
            {/* <Autocomplete
              disabled
              className={styles.search}
              // options={dropdownOptions}
              value={dropdownValue}
              onChange={(selectedItem) => setDropDownValue(selectedItem)}
            />
             <NavigationInfo
              className={styles.navigationInfo}
              title="Sputnik DAO"
              description="Average values for all DAOs"
              color="blue"
            /> */}
          </div>
        </>
      ) : null}
    </div>
  );
};
