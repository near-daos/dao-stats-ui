import React from 'react';

import * as icons from '../../icons';

export type IconName = keyof typeof icons;

export type SvgIconProps = {
  className?: string;
  size?: number;
  color?: string;
  icon: IconName;
};

export const SvgIcon: React.FC<SvgIconProps> = ({
  className,
  size = 24,
  color,
  icon,
}) => (
  <svg className={className} width={size} height={size} style={{ color }}>
    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite-icons.svg#${icon}`} />
  </svg>
);

export default SvgIcon;
