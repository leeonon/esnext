import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export type TagsCardProps = {
  tags?: string[];
};

const TagsCard = ({ tags }: TagsCardProps) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <Card className='bg-accent h-fit'>
      <CardHeader>
        <CardTitle className='uppercase'>Tags</CardTitle>
      </CardHeader>
      <CardContent className='flex h-fit flex-row flex-wrap gap-2'>
        {tags.map((v) => (
          <Badge key={v}>{v}</Badge>
        ))}
      </CardContent>
    </Card>
  );
};

export default TagsCard;
