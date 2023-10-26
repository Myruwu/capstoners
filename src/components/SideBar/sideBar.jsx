
import Button from "../Button/button";
import "./sideBarStyle.css";
import { createElement } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoLogOutOutline, IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { GiFlowerPot } from "react-icons/gi";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";


const SideBar = (props) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleLogout = () => {
    alert("Are you sure you want to logout");
    localStorage.clear();
    signOut(auth);
    navigate("/");
  }
  return (
    <aside className={`sidebar ${props.status}`}>
      <div className="sidebar-container">
        <div className='sidebar-logo'>
          <GiFlowerPot />
          <p>Plantito</p>
        </div>
        <nav className='sidebar-nav'>
          <ul>
            {
              props.navigation.length === 0 ?
              "There's no route here" :
              props.navigation.map((route, index) => (
                <li key={index} className={pathname === route.path ? "active" : ""}>
                  <Link to={route.path}>
                    {createElement(route.icon)}
                    <p>{route.title}</p>
                  </Link>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
      <div className="bottomSidebar">
      <div
        className="collapse"
        onClick={props.handleSideBar}>
        {props.status === "open" ? <IoArrowBackOutline size={25}/> : <IoArrowForwardOutline size={25}/>}
        <p>Collapse</p>
      </div>
      <Button variant="danger logout-btn" onClick={handleLogout}>
        <IoLogOutOutline size={15}/>
        <p>Logout</p>
      </Button>
      </div>
    </aside>
  );
};

export default SideBar;