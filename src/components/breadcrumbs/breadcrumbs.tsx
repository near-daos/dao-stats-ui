import React, { FC } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './breadcrumbs.module.scss';

export type BreadcrumbElement = {
  url: string;
  name: string;
};

export interface BreadcrumbsProps {
  className?: string;
  elements: BreadcrumbElement[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ className, elements }) => (
  <div className={clsx(styles.breadcrumbs, className)}>
    {elements.map((element, elementIndex) => {
      if (elements.length - 1 === elementIndex) {
        return (
          <div key={element.name} className={styles.link}>
            {element.name}
          </div>
        );
      }

      return (
        <Link className={styles.link} to={element.url} key={element.name}>
          {element.name}
        </Link>
      );
    })}
  </div>
);
