import React, { FC } from 'react';
import clsx from 'clsx';

import styles from './network-switcher.module.scss';

export type NetworkSwitcherProps = {
  className?: string;
};

export const NetworkSwitcher: FC<NetworkSwitcherProps> = ({ className }) => (
  <div className={clsx(styles.networks, className)}>
    <a
      href={
        `${process.env.REACT_APP_MAINNET}${window.location.pathname}` || '/'
      }
      className={clsx(styles.networkItem, {
        [styles.active]:
          window.location.origin === process.env.REACT_APP_MAINNET ||
          window.location.origin === process.env.REACT_APP_MAIN_SITE,
      })}
    >
      Mainnet
    </a>

    <a
      href={
        `${process.env.REACT_APP_TESTNET}${window.location.pathname}` || '/'
      }
      className={clsx(styles.networkItem, {
        [styles.active]:
          window.location.origin === process.env.REACT_APP_TESTNET,
      })}
    >
      Testnet
    </a>
  </div>
);
