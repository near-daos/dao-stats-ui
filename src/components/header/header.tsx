import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs } from '../tabs';
import { Dropdown, DropdownOption } from '../dropdown/dropdown';
import { NavigationInfo } from '../navigation-info/navigation-info';
import { useForbiddenRoutes, useOptionsForContract } from '../../hooks';
import { NETWORKS } from '../../constants';

import { SvgIcon } from '../svgIcon/svgIcon';

import styles from './header.module.scss';
import { useAppSelector } from '../../store';
import { selectorSelectedContract } from '../../app/shared';

export type HeaderProps = {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
};

const dropdownOptions: DropdownOption[] = [
  {
    id: '0',
    name: 'Fatima Sanders',
    link: 'Quisque libero lacus, varius et, euismod et, commodo at, libero.',
    searchType: NETWORKS.Mainnet,
    type: 'sputnik',
  },
  {
    id: '1',
    name: 'Xaviera Gibson',
    link:
      'Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus',
    searchType: NETWORKS.Mainnet,

    type: 'astro',
  },
  {
    id: '2',
    name: 'Anthony Hawkins',
    link: 'ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus justo',
    searchType: NETWORKS.Mainnet,

    type: 'sputnik',
  },
  {
    id: '3',
    name: 'Hadassah Harrington',
    link:
      'ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam auctor, velit',
    searchType: NETWORKS.Mainnet,

    type: 'sputnik',
  },
  {
    id: '4',
    name: 'Abel Knight',
    link: 'felis. Donec tempor, est ac mattis semper, dui lectus rutrum',
    searchType: NETWORKS.Mainnet,

    type: 'astro',
  },
  {
    id: '5',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
    searchType: NETWORKS.Mainnet,

    type: 'sputnik',
  },
  {
    id: '6',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
    searchType: NETWORKS.Mainnet,

    type: 'astro',
  },
  {
    id: '7',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
    searchType: NETWORKS.Mainnet,

    type: 'sputnik',
  },
  {
    id: '8',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
    searchType: NETWORKS.Mainnet,

    type: 'sputnik',
  },
  {
    id: '9',
    name: 'jonathan',
    link: 'jonathan.sputnikdao.near',
    searchType: NETWORKS.Mainnet,

    type: 'sputnik',
  },
];

export const Header: FC<HeaderProps> = ({ isOpened, setIsOpened }) => {
  const { isForbiddenHeader } = useForbiddenRoutes();
  const selectedContract = useAppSelector(selectorSelectedContract);
  const contractTabOptions = useOptionsForContract();

  const [dropdownValue, setDropDownValue] = useState<DropdownOption | null>(
    null,
  );

  return (
    <div className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img className={styles.logo} alt="" />
      </Link>
      {!isForbiddenHeader ? (
        <>
          <div className={styles.headerControls}>
            <h1 className={styles.title}>{selectedContract?.contractId}</h1>
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
            <Tabs
              variant="medium"
              options={contractTabOptions}
              defaultValue={selectedContract?.contractId}
              className={styles.tabs}
            />
            <Dropdown
              className={styles.search}
              options={dropdownOptions}
              value={dropdownValue}
              onChange={(selectedItem) => setDropDownValue(selectedItem)}
            />
            <NavigationInfo
              className={styles.navigationInfo}
              title={selectedContract?.contractId || ''}
              description={selectedContract?.description || ''}
              color="blue"
            />
          </div>
        </>
      ) : null}
    </div>
  );
};
