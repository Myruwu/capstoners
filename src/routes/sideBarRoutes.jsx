import {
  IoLeafOutline,
  IoNotificationsOutline,
  IoSettingsOutline,
} from "react-icons/io5";


export const SideBarRoutes = [
  {
    path:"/home",
    title:"Dashboard",
    icon: IoLeafOutline,
  },
  {
    path:"/home/alerts",
    title:"Alerts",
    icon: IoNotificationsOutline,
  },
  {
    path:"/home/settings",
    title:"Settings",
    icon: IoSettingsOutline,
  },
];