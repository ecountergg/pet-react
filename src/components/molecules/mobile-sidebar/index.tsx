import { useState, useEffect } from "react";
import { MenuIcon } from "lucide-react";

import {
  ASheet,
  ASheetContent,
  ASheetTrigger,
} from "@/components/atoms/sheet/index";
import { SideNav } from "../side-nav";
import { NAV_ITEMS } from "@/consts/nav-item";

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ASheet open={open} onOpenChange={setOpen}>
        <ASheetTrigger asChild>
          <div className="flex items-center justify-center gap-2">
            <MenuIcon />
            <h1 className="text-lg font-semibold">T3 app template</h1>
          </div>
        </ASheetTrigger>
        <ASheetContent side="left" className="w-72">
          <div className="px-1 py-6 pt-16">
            <SideNav items={NAV_ITEMS} setOpen={setOpen} />
          </div>
        </ASheetContent>
      </ASheet>
    </>
  );
};
