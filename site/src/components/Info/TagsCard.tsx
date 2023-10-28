import { Card, CardBody, CardHeader } from '@nextui-org/react';

import Tag from '~/components/Tag';

export type TagsCardProps = {
  tags?: string[];
};

const TagsCard = ({ tags }: TagsCardProps) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <Card className='h-fit'>
      <CardHeader className='pb-0'>
        <p className='text-tiny font-bold uppercase'>Tags</p>
      </CardHeader>
      <CardBody className='h-fit flex-row flex-wrap gap-2'>
        {tags.map((v) => (
          <Tag key={v}>{v}</Tag>
        ))}
      </CardBody>
    </Card>
  );
};

export default TagsCard;
