import { useEffect, useMemo } from "react";
import { Location, Path, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { MTree, TreeDataItem } from "@/components/molecules/tree/index";
import { Wrapper } from "../wrapper/index";
import MHeader from "@/components/molecules/header/index";
import { NAV_ITEMS, NAV_NAME } from "@/consts/nav-item";
import AuthGuard from "@/guards/auth";
import { useAppSelector } from "@/stores";

import { MBreadcrumb } from "@/components/molecules/breadcrumb/index";
import { IBreadcrumb } from "@/stores/breadcrumb";
import { setBreadrumbs } from "@/stores/breadcrumb";

type Props = {
  children: string | JSX.Element;
};

export const Admin = ({ children }: Props) => {
  const dispatch = useDispatch();
  const items = useAppSelector((state) => state.breadcrumb.items);
  const currentLocation = useLocation();
  const itemBredcrumbs: IBreadcrumb[] = currentLocation.pathname
    .split("/")
    .slice(2)
    .map((item, index, arr) => {
      const parent = arr?.[index - 1];
      return {
        label: NAV_NAME?.[item as keyof typeof NAV_NAME] ?? "",
        href: ["/admin", parent, item].filter((v) => !!v).join("/"),
      };
    });

  useEffect(() => {
    dispatch(setBreadrumbs(itemBredcrumbs));
  }, [currentLocation]);

  const findIdByHref = (
    items: TreeDataItem[],
    location: Location<Path>
  ): string => {
    for (const item of items) {
      if (item.href !== "" && location.pathname.startsWith(item.href ?? "")) {
        return item.id;
      }
      if (item.children) {
        const childResult = findIdByHref(item.children, location);
        if (childResult) {
          return childResult;
        }
      }
    }
    return "";
  };

  const initialSelectedSidebar = useMemo(
    () => findIdByHref(NAV_ITEMS, currentLocation),
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
              initialSelectedItemId={initialSelectedSidebar}
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
