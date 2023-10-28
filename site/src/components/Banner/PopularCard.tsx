'use client';

import { Card, CardBody, Image } from '@nextui-org/react';

const PopularCard = () => {
  return (
    <Card className='my-[7.5px] flex h-[180px] w-[180px] flex-none' radius='sm'>
      <CardBody className='max-h-none max-w-none items-center justify-center border-none p-0'>
        <Image
          isBlurred
          width={80}
          height={80}
          alt='React'
          src='https://lee-oss-1300118632.cos.ap-nanjing.myqcloud.com/obsidian/202310181428834.png'
        ></Image>
      </CardBody>
    </Card>
  );
};

export default PopularCard;
