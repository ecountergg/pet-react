import { Boxes } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/clsx";

import { MobileSidebar } from "@/components/molecules/mobile-sidebar/index";
import { AButton } from "@/components/atoms/button/index";

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          to={"/admin"}
          className="hidden items-center justify-between gap-2 md:flex"
        >
          <Boxes className="h-6 w-6" />
          <h1 className="text-lg font-semibold">Book Catalog</h1>
        </Link>
        <div className={cn("block md:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <AButton size="sm">Logout</AButton>
        </div>
      </nav>
    </div>
  );
}
