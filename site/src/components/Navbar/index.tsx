"use client";

import type { FC, PropsWithChildren } from "react";

import { Icon } from "@iconify/react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";

import AuthUser from "~/components/AuthUser";
import { LogoLong } from "~/components/Logos";
import ThemeButton from "~/components/ThemeButton";

type LinkItemProps = {
  link: string;
};

const LinkItem: FC<PropsWithChildren<LinkItemProps>> = ({ link, children }) => {
  const pathname = usePathname();
  const isActive = pathname === link;
  return (
    <NavbarItem isActive={true}>
      <Link
        as={NextLink}
        href={link}
        aria-current="page"
        color={isActive ? "primary" : "foreground"}
      >
        {children}
      </Link>
    </NavbarItem>
  );
};

export default function ESNextNavbar() {
  const router = useRouter();
  return (
    <Navbar isBlurred maxWidth="full" isBordered>
      <NavbarBrand className="mr-3 grow-0" onClick={() => router.push("/")}>
        <LogoLong width={115} height={30} />
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="start">
        <LinkItem link="/projects">Projects</LinkItem>
        <LinkItem link="/tags">Tags</LinkItem>
        <LinkItem link="/ranking">Ranking</LinkItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                endContent={<Icon icon="mingcute:down-fill" />}
                radius="sm"
                variant="light"
              >
                More
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              description="ACME scales apps to meet user demand, automagically, based on load."
              startContent={<Icon icon="skill-icons:redux" />}
            >
              Autoscaling
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
              startContent={<Icon icon="devicon:vuejs" />}
            >
              Usage Metrics
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description="ACME runs on ACME, join us and others serving requests at web scale."
              startContent={<Icon icon="devicon:svelte" />}
            >
              Production Ready
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              description="Applications stay on the grid with high availability and high uptime guarantees."
            >
              +99% Uptime
            </DropdownItem>
            <DropdownItem
              key="supreme_support"
              description="Overcome any challenge with a supporting team ready to respond."
            >
              +Supreme Support
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <ThemeButton />
        <AuthUser />
      </NavbarContent>
    </Navbar>
  );
}
