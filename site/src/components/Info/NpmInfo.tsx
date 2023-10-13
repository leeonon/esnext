import { Icon } from "@iconify/react";
import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";

const NpmInfo = () => {
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
              href="https://www.baidu.com"
              isExternal
              showAnchorIcon
              anchorIcon={<Icon icon="mdi:link" />}
            >
              <span>Material</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-default-500">Latest version</span>
            <span className="text-default-600">v1.0.0</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-default-500">License</span>
            <span className="text-default-600">MIT</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-default-500">Last publish</span>
            <span className="text-default-600">2 days ago</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default NpmInfo;
