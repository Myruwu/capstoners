import LoginPage from "../pages/LoginPage/loginPage";
import HomePage from "../pages/HomePage/homePage";
import PageNotFound from "../pages/PageNotFound/pageNotFound";


export const MainRoutes = [ 
  {
    path: "/",
    page: LoginPage
  },  
  {
    path: "/home/*",
    page: HomePage
  },
  {
    path: "*",
    page: PageNotFound
  }
];