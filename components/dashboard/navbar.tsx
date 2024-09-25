"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import Container from "./container";
import { FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icons } from "@/public/icons";
import { navLinks, navLinksUser } from "@/constants/navbarLink";
import MobileSidebar from "./mobile-nav";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, HttpMethod } from "@/lib/apiRequest";

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

const UserInfo: FC<any> = ({ role }: any) => {
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const { mutate: logOut, isPending } = useMutation({
    mutationFn: async () => {
      const response = await apiRequest({
        path: "/auth/signout",
        method: HttpMethod.GET,
      });
      return response;
    },
    onSuccess: () => {
      Cookies.remove("accessToken");
      router.push("/");
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex h-[2.4rem] items-center justify-between gap-x-[0.625rem] rounded-full bg-gray-100 px-[0.625rem] py-2">
            <div className="h-6 w-6 rounded-full bg-gray-900"></div>
            <h4 className="text-base font-normal lg:text-lg">{role}</h4>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {role === "Admin" && (
            <DropdownMenuItem>
              <Link href={"/admin"}>Menu Admin</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setIsAlertOpen((prev) => !prev)}>
            <h4 className="text-destructive">Logout</h4>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah anda yakin ingin keluar?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction disabled={isPending} onClick={() => logOut()}>
              Gasss!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const DesktopMenu: FC<any> = ({ isAdmin = true, role }: any) => (
  <div className="hidden w-full items-center lg:flex">
    <nav className="w-full">
      <ul className="flexCenter w-full gap-x-7">
        {isAdmin &&
          navLinks.map((nav) => (
            <NavItem
              href={nav.id}
              label={nav.title}
              key={nav.id}
              icons={nav.icons}
            />
          ))}
        {!isAdmin &&
          navLinksUser.map((nav) => (
            <NavItem
              href={nav.id}
              label={nav.title}
              key={nav.id}
              icons={nav.icons}
            />
          ))}
      </ul>
    </nav>
    <UserInfo role={role} />
  </div>
);

const NavBar: FC<any> = ({ isAdmin = true, role = "Admin" }: any) => {
  return (
    <header className="flexCenter h-14 w-full bg-white text-gray-900">
      <Container className="flex w-full items-center justify-between">
        <Logo />

        {/* FOR DESKTOP LAYOUT*/}
        <DesktopMenu isAdmin={isAdmin} role={role} />

        {/* FOR MOBILE LAYOUT */}
        <MobileSidebar isAdmin={isAdmin} />
      </Container>
    </header>
  );
};

export default NavBar;
