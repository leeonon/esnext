import { Icon } from "@iconify/react";
import { Select, SelectItem } from "@nextui-org/react";
import { memo, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";

const SortFilter = ({
  onChangeParams,
}: {
  onChangeParams: (name: string, value: string, isDelete?: boolean) => void;
}) => {
  const searchParams = useSearchParams();
  const selectedKeys = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    return params.get("sort") ?? "stars";
  }, [searchParams]);

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      onChangeParams("sort", e.target.value);
    },
    [onChangeParams],
  );

  return (
    <div className="mb-4 flex justify-end">
      <Select
        label="Filter"
        placeholder="Select an item"
        className="w-60 max-w-none"
        size="sm"
        radius="sm"
        onChange={onChange}
        defaultSelectedKeys={["stars"]}
        selectedKeys={[selectedKeys]}
        startContent={<Icon icon="tabler:filter" />}
      >
        <SelectItem key="latest" textValue="Latest">
          Latest
        </SelectItem>
        <SelectItem key="stars" textValue="Stars">
          Most stars
        </SelectItem>
        <SelectItem key="download" textValue="Download">
          Most Downloaded
        </SelectItem>
      </Select>
    </div>
  );
};

export default memo(SortFilter);
