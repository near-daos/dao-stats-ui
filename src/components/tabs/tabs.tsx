import React, { useState } from 'react';
import clsx from 'clsx';

import s from './tabs.module.scss';

type Option = {
  label: string;
  value: string;
};

export interface TabsProps {
  className?: string;
  options: Option[];
  onChange?: (id: string) => void;
  defaultValue?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  className,
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
    <div className={clsx(s.tabsWrapper, className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={clsx(s.tab, {
            [s.active]: activeTab === option.value,
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
