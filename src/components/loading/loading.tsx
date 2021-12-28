import React, { FC } from 'react';

import styles from './loading.module.scss';

export type LoadingProps = {
  className?: string;
};

export const Loading: FC<LoadingProps> = ({ className }) => (
  <svg
    width="238"
    height="129"
    viewBox="0 0 238 129"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M235.5 53.2266
    L214.479 126.168
    L193.262 100.21
    L172.24 92.4863
    L150.826 103.428
    L129.806 69.5312
    L108.392 59.6631
    L86.9775 2.16797
    L65.9561 126.168
    L44.7383 66.3135
    L23.3242 56.6592
    L2.5 123.379"
      stroke="#2E2D2D"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      className={styles.path}
      d="M235.5 53.2266
    L214.479 126.168
    L193.262 100.21
    L172.24 92.4863
    L150.826 103.428
    L129.806 69.5312
    L108.392 59.6631
    L86.9775 2.16797
    L65.9561 126.168
    L44.7383 66.3135
    L23.3242 56.6592
    L2.5 123.379"
      stroke="#ffc300"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
