import type { GetServerSidePropsContext } from "next";

import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import { useSearchParams } from "next/navigation";

export default function ProjectInfo() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <div>
      <div>
        <Image
          as={NextImage}
          isZoomed={true}
          width={200}
          height={200}
          className="projectBoxImage"
          src="https://lee-oss-1300118632.cos.ap-nanjing.myqcloud.com/obsidian/202310091757604.jpg"
          alt=""
        />
      </div>
      {name}
    </div>
  );
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { query } = context;
  const { name } = query;
  if (!name) {
    return { redirect: { destination: "/404" } };
  }

  return {
    props: {},
  };
};
