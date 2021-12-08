import React, { FC } from 'react';

import { Button } from '../../components';

import error404 from '../../images/error404.svg';

import styles from './page-404.module.scss';

export const Page404: FC = () => (
  <div className={styles.page404}>
    <img className={styles.image} src={error404} alt="Error 404" />
    <h1 className={styles.title}>Page not found</h1>
    <span className={styles.subTitle}>
      We&apos;re sorry, the page you were trying to retrieve does not exist
    </span>
    <Button className={styles.button} href="/">
      Back to homepage
    </Button>
  </div>
);
