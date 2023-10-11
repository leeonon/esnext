// https://juejin.cn/post/7155514465591984136#heading-14
import { Icon } from "@iconify/react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

export default function AuthUser() {
  const { data: sessionData } = useSession();

  const { data: userInfo } = api.user.userInfo.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  if (!userInfo) {
    return (
      <NavbarItem className="hidden lg:flex">
        <Button isIconOnly onClick={() => void signIn()}>
          <Icon icon="octicon:mark-github-16" fontSize={24} />
        </Button>
      </NavbarItem>
    );
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={userInfo.name ?? ""}
          size="sm"
          src={userInfo.image ?? ""}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{userInfo.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onClick={() => void signOut()}
        >
          SignOut
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
