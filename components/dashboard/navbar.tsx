"use client";

import Link from "next/link";
import Container from "./container";
import { FC, useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icons } from "@/public/icons";
import { navLinks } from "@/constants/navbarLink";
import MobileSidebar from "./mobile-nav";

interface NavItem {
  href: string;
  label: string;
  icons: {
    fill: any;
    outline: any;
  };
}

const NavItem: FC<NavItem> = ({ href, label, icons }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const pathname = usePathname();
  const nowPathname = pathname.split("/");

  const isActivePage = () => nowPathname[1] === href;
  return (
    <li>
      <Link href={`/${href}`}>
        <div
          className={cn(
            "flex h-14 items-center gap-x-1 border-gray-900 transition-all hover:translate-y-[1.5px] hover:border-b-4 hover:font-bold",
            isActivePage() && "activeMenu",
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered || isActivePage() ? <icons.fill /> : <icons.outline />}
          <h4>{label}</h4>
        </div>
      </Link>
    </li>
  );
};

const Logo: FC = () => (
  <Link href="/">
    <Icons.Logo />
  </Link>
);

const UserInfo: FC = () => (
  <button className="flex h-[2.4rem] items-center justify-between gap-x-[0.625rem] rounded-full bg-gray-100 px-[0.625rem] py-2">
    <div className="h-6 w-6 rounded-full bg-gray-900"></div>
    <h4 className="text-base font-normal lg:text-lg">Admin</h4>
  </button>
);

const DesktopMenu: FC = () => (
  <div className="hidden w-full items-center lg:flex">
    <nav className="w-full">
      <ul className="flexCenter w-full gap-x-7">
        {navLinks.map((nav) => (
          <NavItem
            href={nav.id}
            label={nav.title}
            key={nav.id}
            icons={nav.icons}
          />
        ))}
      </ul>
    </nav>
    <UserInfo />
  </div>
);

const NavBar: FC = () => {
  return (
    <header className="flexCenter h-14 w-full bg-white text-gray-900">
      <Container className="flex w-full items-center justify-between">
        <Logo />

        {/* FOR DESKTOP LAYOUT*/}
        <DesktopMenu />

        {/* FOR MOBILE LAYOUT */}
        <MobileSidebar />
      </Container>
    </header>
  );
};

export default NavBar;
