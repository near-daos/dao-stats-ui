import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Autocomplete, AutocompleteOption } from '../autocomplete/autocomplete';
import { useForbiddenRoutes } from '../../hooks';

import { SvgIcon } from '../svgIcon/svgIcon';

import styles from './header.module.scss';

import desktopLogo from '../../images/logo-mobile.svg';
import mobileLogo from '../../images/daostats.svg';

export type HeaderProps = {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
};

const dropdownOptions: AutocompleteOption[] = [
  {
    id: '0',
    name: 'Fatima Sanders',
    link: 'Quisque libero lacus, varius et, euismod et, commodo at, libero.',
  },
  {
    id: '1',
    name: 'Xaviera Gibson',
    link:
      'Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus',
  },
  {
    id: '2',
    name: 'Anthony Hawkins',
    link: 'ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo',
  },
  {
    id: '3',
    name: 'Hadassah Harrington',
    link:
      'ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam auctor, velit',
  },
  {
    id: '4',
    name: 'Abel Knight',
    link: 'felis. Donec tempor, est ac mattis semper, dui lectus rutrum',
  },
  {
    id: '5',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
  },
  {
    id: '6',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
  },
  {
    id: '7',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
  },
  {
    id: '8',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
  },
  {
    id: '9',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
  },
];

export const Header: FC<HeaderProps> = ({ isOpened, setIsOpened }) => {
  const { isForbiddenHeader } = useForbiddenRoutes();
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
          <div className={styles.headerControls}>
            <h1 className={styles.title}>Sputnik DAO</h1>
            <button type="button" className={styles.mobileIcon}>
              <SvgIcon icon="search" />
            </button>
          </div>
          <button
            type="button"
            className={styles.mobileIcon}
            onClick={() => setIsOpened(!isOpened)}
          >
            <SvgIcon icon={isOpened ? 'close' : 'burger'} />
          </button>

          <div className={styles.main}>
            <Autocomplete
              disabled
              className={styles.search}
              options={dropdownOptions}
              value={dropdownValue}
              onChange={(selectedItem) => setDropDownValue(selectedItem)}
            />
            {/* <NavigationInfo
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
