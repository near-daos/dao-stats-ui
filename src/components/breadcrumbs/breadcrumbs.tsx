import React, { FC } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router';

import { useAppDispatch } from '../../store';
import { clearDao } from '../../app/shared';

import styles from './breadcrumbs.module.scss';

export type BreadcrumbElement = {
  url: string;
  name: string;
};

export interface BreadcrumbsProps {
  className?: string;
  elements: BreadcrumbElement[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ className, elements }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const clearFromDao = (link: string) => {
    dispatch(clearDao());
    history.push(link);
  };

  return (
    <div className={clsx(styles.breadcrumbs, className)}>
      {elements.map((element, elementIndex) => {
        if (elements.length - 1 === elementIndex) {
          return <span key={element.name}>{element.name}</span>;
        }

        return (
          <button
            className={styles.link}
            onClick={() => clearFromDao(element.url)}
            key={element.name}
          >
            {element.name}
          </button>
        );
      })}
    </div>
  );
};
