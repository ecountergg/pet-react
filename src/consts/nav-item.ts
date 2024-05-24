import { TreeDataItem } from "@/components/molecules/tree";
import {
  Book,
  LayoutDashboard,
  ListTodo,
  PersonStanding,
  Users,
} from "lucide-react";

export const NAV_ITEMS: TreeDataItem[] = [
  {
    id: "1",
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    id: "2",
    name: "Users",
    icon: Users,
    href: "/users",
    color: "text-green-500",
  },
  {
    id: "3",
    name: "Master Data",
    icon: ListTodo,
    href: "/master-data",
    color: "text-orange-500",
    children: [
      {
        id: "3-1",
        name: "Author",
        icon: PersonStanding,
        color: "text-red-500",
        href: "/admin/master-data/author",
      },
      {
        id: "3-2",
        name: "Book",
        icon: Book,
        color: "text-purple-500",
        href: "/admin/master-data/book",
      },
    ],
  },
];
