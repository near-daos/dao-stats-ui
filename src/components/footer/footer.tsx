import React, { FC } from 'react';
import { gitHub, magicPoweredLogo } from '../../icons';

import styles from './footer.module.scss';

export const Footer: FC = () => (
  <div className={styles.footer}>
    <div className={styles.links}>
      <a
        className={styles.link}
        target="_blank"
        rel="noreferrer"
        href="https://github.com/near-daos/dao-stats-ui"
      >
        <img className={styles.image} src={gitHub} alt="GitHub" />
        <div className={styles.linkText}>GitHub</div>
      </a>
      <a
        className={styles.link}
        target="_blank"
        rel="noreferrer"
        href="https://mainnet.api.daostats.io/docs/"
      >
        Mainnet Docs
      </a>
      <a
        className={styles.link}
        target="_blank"
        rel="noreferrer"
        href="https://testnet.api.daostats.io/docs/"
      >
        Testnet Docs
      </a>
    </div>
    <a
      target="_blank"
      rel="noreferrer"
      href="https://magicpowered.io"
      className={styles.aboutUs}
    >
      By{' '}
      <img
        className={styles.image}
        src={magicPoweredLogo}
        alt="MagicPowered Logo"
      />
    </a>
  </div>
);
