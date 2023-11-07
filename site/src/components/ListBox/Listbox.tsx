import type { ListBoxItemProps } from './ListboxItem';
import type { FC, PropsWithChildren } from 'react';

import React, { useCallback, useMemo, useState } from 'react';

import { ListBoxContext } from './context';

export type ListBoxProps = {
  value: string | number;
  onSelect: (value: string | number) => void;
};

export const ListBox: FC<PropsWithChildren<ListBoxProps>> = ({
  children,
  onSelect,
  value,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | number>(value);

  const handleSelect = useCallback(
    (key: string | number) => {
      setSelectedValue(key);
      onSelect && onSelect(key);
    },
    [onSelect],
  );

  const contextValue = useMemo(
    () => ({ value: selectedValue, onSelect: handleSelect }),
    [handleSelect, selectedValue],
  );

  return (
    <ListBoxContext.Provider value={contextValue}>
      <div>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<ListBoxItemProps>(child)) {
            return React.cloneElement(child, {
              index,
              isActive: selectedValue === child.props.value,
            });
          }
          return child;
        })}
      </div>
    </ListBoxContext.Provider>
  );
};
