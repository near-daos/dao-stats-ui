import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components';
import logo from '../../images/daostats.svg';
import error404 from '../../images/error404.svg';

import styles from './page404.module.scss';

export const Page404: FC = () => (
  <div className={styles.uiKit}>
    <section className={styles.section}>
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
    </section>
    <section className={styles.flexWrapper}>
      <span className={styles.main404}>
        <img src={error404} alt="Error 404" />
        <p className={styles.notFound}>Page not found</p>
        <p className={styles.paragraphItem}>
          We&apos;re sorry, the page you were trying to retrieve does not exist
        </p>
        <div className={styles.column}>
          <Button href="/">Back to homepage</Button>
        </div>
      </span>
    </section>
  </div>
);
