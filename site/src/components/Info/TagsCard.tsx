import { Card, CardBody, CardHeader } from "@nextui-org/react";

import Tag from "~/components/Tag";

const TagsCard = () => {
  return (
    <Card className="h-fit">
      <CardHeader className="pb-0">
        <p className="text-tiny font-bold uppercase">Tags</p>
      </CardHeader>
      <CardBody className="h-fit flex-row flex-wrap gap-2">
        <Tag>Server</Tag>
        <Tag>Cli</Tag>
        <Tag>Desktop</Tag>
        <Tag>Mobile</Tag>
        <Tag>Request</Tag>
      </CardBody>
    </Card>
  );
};

export default TagsCard;
