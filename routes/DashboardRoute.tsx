//import node modules libraries
import { v4 as uuid } from "uuid";
import {
  IconFiles,
  IconShoppingBag,
  IconNews,
  IconFile,
  IconLock,
} from "@tabler/icons-react";

//import custom type
import { MenuItemType } from "types/menuTypes";

// todo : this is slidebar menu update this.

export const DashboardMenu: MenuItemType[] = [
  {
    id: uuid(),
    title: "Project",
    link: "/",
    icon: <IconFiles size={20} strokeWidth={1.5} />,
  },
  {
    id: uuid(),
    title: "Ecommerce",
    link: "/ecommerce",
    icon: <IconShoppingBag size={20} strokeWidth={1.5} />,
  },
  {
    id: uuid(),
    title: "Department",
    link: "/department",
    icon: <IconNews size={20} strokeWidth={1.5} />,
  },
  {
    id: uuid(),
    title: "Faculty",
    link: "/faculty",
    icon: <IconNews size={20} strokeWidth={1.5} />,
  },
  {
    id: uuid(),
    title: "Student",
    link: "/student",
    icon: <IconNews size={20} strokeWidth={1.5} />,
  },
  {
    id: uuid(),
    title: "Institute",
    link: "/institute",
    icon: <IconNews size={20} strokeWidth={1.5} />,
  },
  {
    id: uuid(),
    title: "Auth",
    link: "/sign-in",
    icon: <IconLock size={20} strokeWidth={1.5} />,
  },

  {
    id: uuid(),
    title: "Pages",
    grouptitle: true,
  },
  {
    id: uuid(),
    title: "Pages",
    icon: <IconFile size={20} strokeWidth={1.5} />,
    children: [
      { id: uuid(), name: "Maintenance", link: "maintenance" },
      { id: uuid(), name: "404 Error", link: "not-found" },
    ],
  },
];
