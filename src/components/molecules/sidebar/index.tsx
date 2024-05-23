import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight } from "lucide-react";

import { AButton } from "@/components/atoms/button/index";
import { SideNav } from "@/components/molecules/side-nav/index";
import { cn } from "@/lib/clsx";
import { RootState } from "@/stores/index";
import { setIsOpen } from "@/stores/sidebar";
import { ASeparator } from "@/components/atoms/separator/index";
import { NAV_ITEMS } from "@/consts/nav-item";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  const [swith, setSwitch] = useState(false);

  const handleToggle = () => {
    setSwitch(true);
    dispatch(setIsOpen());
    setTimeout(() => setSwitch(false), 500);
  };
  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-16 md:block`,
        swith && "duration-500",
        isOpen ? "w-72" : "w-[78px]",
        className
      )}
    >
      <div className="px-3 pb-2">
        <div className="mt-3 space-y-1">
          <SideNav
            className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
            items={NAV_ITEMS}
          />
        </div>
      </div>
      <div className="mt-30 absolute bottom-5 w-full space-y-2 px-3">
        <ASeparator />
        <AButton
          onClick={handleToggle}
          className={cn("h-10 w-full bg-foreground", isOpen && "rotate-180")}
        >
          <ChevronRight className="h-4 w-4" />
        </AButton>
      </div>
    </nav>
  );
}
