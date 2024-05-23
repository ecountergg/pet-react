import {
  Book,
  LayoutDashboard,
  ListTodo,
  PersonStanding,
  Users,
} from "lucide-react";

import { NavItem } from "@/types/nav-item";

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    title: "Users",
    icon: Users,
    href: "/users",
    color: "text-green-500",
  },
  {
    title: "Master Data",
    icon: ListTodo,
    href: "/master-data",
    color: "text-orange-500",
    isChidren: true,
    children: [
      {
        title: "Author",
        icon: PersonStanding,
        color: "text-red-500",
        href: "/admin/master-data/author",
      },
      {
        title: "Book",
        icon: Book,
        color: "text-green-500",
        href: "/admin/master-data/book",
      },
    ],
  },
];
