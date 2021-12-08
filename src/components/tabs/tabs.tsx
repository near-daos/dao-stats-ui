import React, { useState } from 'react';
import clsx from 'clsx';

import styles from './tabs.module.scss';

export type TabOption = {
  label: string;
  value: string;
};

export interface TabsProps {
  className?: string;
  variant?: 'large' | 'medium' | 'small';
  options: TabOption[];
  onChange?: (id: string) => void;
  defaultValue?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  className,
  variant = 'large',
  defaultValue = '',
  options = [],
  onChange = () => null,
}) => {
  const [activeTab, setActiveTab] = useState(
    defaultValue || (options.length > 0 ? options[0].value : ''),
  );

  const handleOnChange = (value: string) => {
    setActiveTab(value);
    onChange(value);
  };

  return (
    <div className={clsx(styles.tabsWrapper, styles[variant], className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={clsx(styles.tab, {
            [styles.active]: activeTab === option.value,
          })}
          onClick={() => handleOnChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
