import { useMemo } from "react";
import { Location, Path, useLocation } from "react-router-dom";

import { MTree, TreeDataItem } from "@/components/molecules/tree/index";
import { Wrapper } from "../wrapper/index";
import MHeader from "@/components/molecules/header/index";
import { NAV_ITEMS } from "@/consts/nav-item";
import AuthGuard from "@/guards/auth";
import { useAppSelector } from "@/stores";
import { MBreadcrumb } from "@/components/molecules/breadcrumb/index";

type Props = {
  children: string | JSX.Element;
};

export const Admin = ({ children }: Props) => {
  const items = useAppSelector((state) => state.breadcrumb.items);
  const currentLocation = useLocation();

  const findMostSpecificNavItem = (
    currentLocationPath: Location<Path>,
    navItems: TreeDataItem[]
  ): TreeDataItem | null => {
    let matchedItem = null;

    for (const item of navItems) {
      if (item.href && currentLocation.pathname.startsWith(item.href)) {
        if (!item.children) {
          matchedItem = item;
          break;
        }
        const childMatch: TreeDataItem | null = findMostSpecificNavItem(
          currentLocationPath,
          item.children
        );
        if (childMatch) {
          matchedItem = childMatch;
          break;
        }
      }
    }

    return matchedItem;
  };

  const initialSelectedSidebar = useMemo(
    () => findMostSpecificNavItem(currentLocation, NAV_ITEMS),
    [currentLocation]
  );

  return (
    <AuthGuard>
      <Wrapper>
        <div className="relative flex flex-col h-screen w-screen border-collapse overflow-hidden">
          <MHeader />
          <div className="flex flex-1 overflow-auto w-full">
            <MTree
              data={NAV_ITEMS}
              className="flex-shrink-0 w-[200px] border"
              initialSelectedItemId={initialSelectedSidebar?.id}
            />
            <main className="w-full overflow-auto bg-secondary/10">
              <MBreadcrumb items={items} />
              {children}
            </main>
          </div>
        </div>
      </Wrapper>
    </AuthGuard>
  );
};
