"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import Sidebar from "./mobile-sidebar-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Button variant={"ghost"} size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"} className="w-[230px] p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
