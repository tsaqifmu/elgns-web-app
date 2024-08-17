"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icons } from "@/public/icons";
import { navLinks } from "@/constants/navbarLink";

interface ListMenuProps {
  href: string;
  label: string;
  icons: {
    fill: any;
    outline: any;
  };
}

const Logo = () => (
  <div className="ml-3 mt-3">
    <Link href="/dashboard">
      <Icons.Logo />
    </Link>
  </div>
);

const ListMenu: FC<ListMenuProps> = ({ href, icons, label }) => {
  const pathname = usePathname();
  const nowPathname = pathname.split("/");

  const isActivePage = () => nowPathname[1] === href;
  return (
    <>
      <Link
        href={href}
        key={href}
        className={cn(
          "flex w-full justify-start rounded-lg border-gray-900 p-3",
          isActivePage() && "activeMenu",
        )}
      >
        <div className="flex items-center space-x-5">
          {isActivePage() ? <icons.fill /> : <icons.outline />}
          <h4>{label}</h4>
        </div>
      </Link>
    </>
  );
};

const SidebarMenu = () => {
  return (
    <>
      <Logo />
      <div className="flex h-full flex-col justify-center p-4">
        <div className="space-y-3">
          {navLinks.map((navlink) => (
            <ListMenu
              key={navlink.id}
              href={navlink.id}
              icons={navlink.icons}
              label={navlink.title}
            />
          ))}
          <div className="pt-10">{/* <LogoutButton /> */}</div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
