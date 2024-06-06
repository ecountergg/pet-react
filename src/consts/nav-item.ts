import { TreeDataItem } from "@/components/molecules/tree";
import {
  Book,
  LayoutDashboard,
  ListTodo,
  PersonStanding,
  Users,
} from "lucide-react";

export const NAV_NAME = {
  authors: "Authors",
  dashboard: "Dashboard",
  "master-data": "Master Data",
  users: "Users",
};

export const NAV_ITEMS: TreeDataItem[] = [
  {
    id: "1",
    name: NAV_NAME.dashboard,
    icon: LayoutDashboard,
    href: "/admin/dashboard",
    color: "text-sky-500",
  },
  {
    id: "2",
    name: NAV_NAME.users,
    icon: Users,
    href: "/admin/users",
    color: "text-green-500",
  },
  {
    id: "3",
    name: NAV_NAME["master-data"],
    icon: ListTodo,
    href: "",
    color: "text-orange-500",
    children: [
      {
        id: "3-1",
        name: NAV_NAME.authors,
        icon: PersonStanding,
        color: "text-orange-500",
        href: "/admin/master-data/authors",
      },
      {
        id: "3-2",
        name: "Book",
        icon: Book,
        color: "text-orange-500",
        href: "",
      },
    ],
  },
];
