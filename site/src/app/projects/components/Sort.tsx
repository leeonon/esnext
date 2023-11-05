import { memo, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

const SortFilter = ({
  onChangeParams,
}: {
  onChangeParams: (name: string, value: string, isDelete?: boolean) => void;
}) => {
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
    <div className='mb-4 flex justify-end'>
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
    </div>
  );
};

export default memo(SortFilter);
