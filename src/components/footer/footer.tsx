import React, { FC } from 'react';
import { useForbiddenRoutes } from '../../hooks';
import { gitHub, magicPoweredLogo } from '../../icons';

import styles from './footer.module.scss';

export const Footer: FC = () => {
  const { isForbiddenFooter } = useForbiddenRoutes();

  return isForbiddenFooter ? (
    <div className={styles.footer}>
      <div className={styles.links}>
        <a href="https://github.com/near-daos/dao-stats-ui">
          <img className={styles.image} src={gitHub} alt="Git Hub" /> Git Hub
        </a>
        <a href="https://testnet.api.daostats.io/docs">Testnet Docs</a>
        <a href="https://mainnet.api.daostats.io/docs">Mainnet Docs</a>
      </div>
      <div className={styles.aboutUs}>
        By{' '}
        <img
          className={styles.image}
          src={magicPoweredLogo}
          alt="MagicPowered Logo"
        />
      </div>
    </div>
  ) : null;
};
