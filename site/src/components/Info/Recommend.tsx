import { Card, Image } from "@nextui-org/react";
import NextImage from "next/image";

const RecommendCard = () => {
  return (
    <Card>
      <div className="max-w-full">
        <Image
          as={NextImage}
          isBlurred
          width={70}
          height={70}
          radius="lg"
          className="projectBoxImage"
          src="https://lee-oss-1300118632.cos.ap-nanjing.myqcloud.com/obsidian/202310091757604.jpg"
          alt=""
        />
        <p>Static</p>
        <p className="overflow-ellipsis">
          Boost.space tech stack Were aware of 11 technologies that tech stack
          Ne Recent launches cloud
        </p>
      </div>
    </Card>
  );
};

const Recommend = () => {
  return (
    <div className="max-w-full flex-col gap-3">
      <RecommendCard />
      <RecommendCard />
      <RecommendCard />
      <RecommendCard />
      <RecommendCard />
    </div>
  );
};

export default Recommend;
