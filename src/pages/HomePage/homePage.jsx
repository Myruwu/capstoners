import "./homePageStyle.css";
import { createElement, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import { HomeRoutes } from "../../routes/homeRoutes";
import { SideBarRoutes } from "../../routes/sideBarRoutes";
import SideBar from "../../components/SideBar/sideBar"; 
import ProtectedRoutes from "../../auth/protectedRoutes";
import NavBar from "../../components/NavBar/navBar";


const HomePage = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const handleSideBar = () => {
    sideBarOpen ? setSideBarOpen(false) : setSideBarOpen(true)
  }
  return (
    <ProtectedRoutes>
      <NavBar/>
      <section className="main-page">
            <Routes>
              {
                HomeRoutes.length === 0 ?
                <Route path='/' element={<div>There's no route here</div>} /> :
                HomeRoutes.map((route, index) => 
                  <Route 
                    key={index} 
                    path={route.path} 
                    element={createElement(route.page)} 
                  />
                )
              }
            </Routes>  
      </section>
    </ProtectedRoutes>
  );
};

export default HomePage;