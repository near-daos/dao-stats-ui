import React, { ReactChild } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router';

import { SvgIcon } from '../svgIcon/svgIcon';

import styles from './button.module.scss';

export interface ButtonProps {
  children?: ReactChild;
  variant?: 'primary' | 'icon';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: 'submit' | 'reset' | 'button';
  active?: boolean;
  disabled?: boolean;
  href?: string;
  value?: string;
  currentValue?: string;
  [other: string]: unknown;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  children,
  onClick,
  type = 'button',
  disabled = false,
  href,
  ...other
}) => {
  const history = useHistory();
  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    if (href) {
      history.push(href);

      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={clsx(styles.root, styles[variant], className)}
      onClick={handleClick}
      type={!href ? type : undefined}
      disabled={disabled}
      {...other}
    >
      {variant === 'icon' ? <SvgIcon size={24} icon="arrow" /> : children}
    </button>
  );
};

export default Button;
