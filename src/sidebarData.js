import React from "react";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
export const sidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Menu",
    path: "/menu",
    icon: <MdIcons.MdRestaurantMenu />,
    cName: "nav-text",
  },
  {
    title: "Login",
    path: "/login",
    icon: <MdIcons.MdLogin />,
    cName: "nav-text",
  },
  {
    title: "Register",
    path: "/register",
    icon: <AiIcons.AiFillEdit />,
    cName: "nav-text",
  },
];
export const sidebarDataLoggedIn = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Menu",
    path: "/menu",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/login",
    icon: <MdIcons.MdLogout />,
    cName: "nav-text",
  },
];
