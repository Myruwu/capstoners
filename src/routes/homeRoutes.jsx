import AlertsPage from "../pages/AlertsPage/alertsPage";
import DashboardPage from "../pages/DashboardPage/dashboardPage";
import GardenPage from "../pages/GardenPage/gardenPage";
import PageNotFound from "../pages/PageNotFound/pageNotFound";
import SettingsPage from "../pages/SettingsPage/settingsPage";


export const HomeRoutes = [ 
  {
    path: "/",
    page: DashboardPage
  },
  {
    path: "/alerts",
    page: AlertsPage
  },
  {
    path: "/plants",
    page: GardenPage
  },
  {
    path: "/settings",
    page: SettingsPage
  },
  {
    path: "/*",
    page: PageNotFound
  }
];