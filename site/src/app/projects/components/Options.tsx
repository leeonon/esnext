import { memo, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ActivityLogIcon, DashboardIcon } from '@radix-ui/react-icons';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';

import { useProjectsListContext } from '../context';

const Options = () => {
  const { layout, onChangeParams, onChangeLayout } = useProjectsListContext();

  const searchParams = useSearchParams();
  const selectedKeys = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    return params.get('sort') ?? 'stars';
  }, [searchParams]);

  const onChange = useCallback(
    (key: string) => {
      onChangeParams('sort', key);
    },
    [onChangeParams],
  );

  return (
    <div className='mb-4 flex justify-start gap-2'>
      <Select onValueChange={onChange} value={selectedKeys}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Select a fruit' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value='latest'>Latest</SelectItem>
            <SelectItem value='stars'>Most stars</SelectItem>
            <SelectItem value='download'>Most Downloaded</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <ToggleGroup type='single' value={layout} onValueChange={onChangeLayout}>
        <ToggleGroupItem value='list' aria-label='list layout'>
          <ActivityLogIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value='grid' aria-label='grid layout'>
          <DashboardIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default memo(Options);
