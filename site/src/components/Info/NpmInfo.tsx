import type { ProjectDetailType } from "~/types";
import type { FC } from "react";

import { Icon } from "@iconify/react";
import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import dayjs from "dayjs";

export type NpmInfoProps = {
  project?: ProjectDetailType;
};

const NpmInfo: FC<NpmInfoProps> = ({ project }) => {
  if (!project) {
    return null;
  }

  return (
    <Card className="h-fit">
      <CardHeader className="pb-0">
        <p className="text-tiny font-bold uppercase">Npm</p>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-default-500">Link</span>
            <Link
              href={`https://www.npmjs.com/package/${project.name.toLocaleLowerCase()}`}
              target="_blank"
              isExternal
              showAnchorIcon
              anchorIcon={<Icon icon="mdi:link" />}
            >
              <span>{project.name}</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-default-500">Latest version</span>
            <span className="text-default-600">v{project.version}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-default-500">Last publish</span>
            <span className="text-default-600">
              {dayjs(project.versionUpdateTime).format("YYYY-MM-DD")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-default-500">License</span>
            <span className="text-default-600">{project.license}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default NpmInfo;
