import React, { ReactChild } from 'react';
import clsx from 'clsx';

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
  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    if (onClick) {
      onClick(event);
    }
  };

  const Element = href ? 'a' : 'button';

  return (
    <Element
      className={clsx(styles.root, styles[variant], className)}
      onClick={handleClick}
      type={!href ? type : undefined}
      disabled={disabled}
      href={href}
      {...other}
    >
      {variant === 'icon' ? <SvgIcon size={24} icon="arrow" /> : children}
    </Element>
  );
};

export default Button;
