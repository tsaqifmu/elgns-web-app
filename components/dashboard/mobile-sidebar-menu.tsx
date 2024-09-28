"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
import { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { apiRequest, HttpMethod } from "@/lib/apiRequest";
import { cn } from "@/lib/utils";

import { Icons } from "@/public/icons";
import { navLinks, navLinksUser } from "@/constants/navbarLink";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

const LogoutButton = () => {
  const router = useRouter();

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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full justify-start rounded-lg border-gray-900 p-3"
        >
          <div className="flex items-center space-x-5">
            <LogOut size={17} />
            <h4 className="text-destructive">Keluar</h4>
          </div>
        </Button>
      </AlertDialogTrigger>
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
  );
};

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

const SidebarMenu: FC<any> = ({ isAdmin = true }: { isAdmin: boolean }) => {
  return (
    <>
      <Logo />
      <div className="flex h-full flex-col justify-center p-4">
        <div className="space-y-3">
          {isAdmin && (
            <>
              {navLinks.map((navlink) => (
                <ListMenu
                  key={navlink.id}
                  href={navlink.id}
                  icons={navlink.icons}
                  label={navlink.title}
                />
              ))}
              <ListMenu
                key="admin"
                href="admin"
                icons={{
                  fill: Icons.AdminFill,
                  outline: Icons.AdminOutline,
                }}
                label="ADMIN"
              />
            </>
          )}

          {!isAdmin &&
            navLinksUser.map((navlink) => (
              <ListMenu
                key={navlink.id}
                href={navlink.id}
                icons={navlink.icons}
                label={navlink.title}
              />
            ))}
          <div className="pt-10">
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
